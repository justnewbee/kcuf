import {
  TByte,
  TInt
} from '../types';
import {
  MIN_VERSION,
  MAX_VERSION,
  PENALTY_N1,
  PENALTY_N2,
  PENALTY_N3,
  PENALTY_N4,
  ECC_CODEWORDS_PER_BLOCK,
  NUM_ERROR_CORRECTION_BLOCKS
} from '../const';
import {
  assert,
  getBit,
  getNumDataCodewords,
  getNumRawDataModules,
  reedSolomonComputeDivisor,
  reedSolomonComputeRemainder
} from '../util';

import Ecc from './ecc';

/*
 * A QR Code symbol, which is a type of two-dimension barcode.
 * Invented by Denso Wave and described in the ISO/IEC 18004 standard.
 * Instances of this class represent an immutable square grid of dark and light cells.
 *
 * The class provides static factory functions to create a QR Code from text or binary data.
 * The class covers the QR Code Model 2 specification, supporting all versions (sizes)
 * from 1 to 40, all 4 error correction levels, and 4 character encoding modes.
 *
 * Ways to create a QR Code object:
 *
 * - High level: Take the payload data and call encodeText() or encodeBinary().
 * - Mid level: Custom-make the list of segments and call encodeSegments().
 * - Low level: Custom-make the array of data codeword bytes (including
 *   segment headers and final padding, excluding error correction codewords),
 *   supply the appropriate version number, and call the QrCode() constructor.
 *
 * (Note that every way requires supplying the desired error correction level.)
 */
export default class QrCode {
  // The width and height of this QR Code, measured in modules, between
  // 21 and 177 (inclusive). This is equal to version * 4 + 17.
  readonly size: TInt;
  
  // The index of the mask pattern used in this QR Code, which is between 0 and 7 (inclusive).
  // Even if a QR Code is created with automatic masking requested (mask = -1),
  // the resulting object still has a mask value between 0 and 7.
  readonly mask: TInt;
  
  // The modules of this QR Code (false = light, true = dark).
  // Immutable after constructor finishes. Accessed through getModule().
  private readonly modules: boolean[][] = [];
  
  // Indicates function modules that are not subjected to masking. Discarded when constructor finishes.
  private readonly isFunction: boolean[][] = [];
  
  /* -- Constructor (low level) and fields -- */
  
  // Creates a new QR Code with the given version number,
  // error correction level, data codeword bytes, and mask number.
  // This is a low-level API that most users should not use directly.
  // A mid-level API is the encodeSegments() function.
  
  /**
   * @param version The version number of this QR Code, which is between 1 and 40 (inclusive). This determines the size of this barcode.
   * @param errorCorrectionLevel The error correction level used in this QR Code.
   * @param dataCodewords
   * @param msk
   */
  constructor(readonly version: TInt, readonly errorCorrectionLevel: Ecc, dataCodewords: readonly TByte[], msk: TInt) {
    // Check scalar arguments
    if (version < MIN_VERSION || version > MAX_VERSION) {
      throw new RangeError('Version value out of range');
    }
    
    if (msk < -1 || msk > 7) {
      throw new RangeError('Mask value out of range');
    }
    
    this.size = version * 4 + 17;
    
    // Initialize both grids to be size*size arrays of Boolean false
    const row: boolean[] = [];
    
    for (let i = 0; i < this.size; i++) {
      row.push(false);
    }
    
    for (let i = 0; i < this.size; i++) {
      this.modules.push(row.slice()); // Initially all light
      this.isFunction.push(row.slice());
    }
    
    // Compute ECC, draw modules
    this.drawFunctionPatterns();
    const allCodewords: TByte[] = this.addEccAndInterleave(dataCodewords);
    
    this.drawCodewords(allCodewords);
    
    // Do masking
    if (msk === -1) { // Automatically choose best mask
      let minPenalty: TInt = 1000000000;
      
      for (let i = 0; i < 8; i++) {
        this.applyMask(i);
        this.drawFormatBits(i);
        const penalty: TInt = this.getPenaltyScore();
        
        if (penalty < minPenalty) {
          msk = i;
          minPenalty = penalty;
        }
        
        this.applyMask(i); // Undoes the mask due to XOR
      }
    }
    
    assert(0 <= msk && msk <= 7);
    
    this.mask = msk;
    this.applyMask(msk); // Apply the final choice of mask
    this.drawFormatBits(msk); // Overwrite old format bits
    
    this.isFunction = [];
  }
  
  // Returns the color of the module (pixel) at the given coordinates, which is false
  // for light or true for dark. The top left corner has the coordinates (x=0, y=0).
  // If the given coordinates are out of bounds, then false (light) is returned.
  getModule(x: TInt, y: TInt): boolean {
    return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
  }
  
  // Reads this object's version field, and draws and marks all function modules.
  private drawFunctionPatterns(): void {
    // Draw horizontal and vertical timing patterns
    for (let i = 0; i < this.size; i++) {
      this.setFunctionModule(6, i, i % 2 === 0);
      this.setFunctionModule(i, 6, i % 2 === 0);
    }
    
    // Draw 3 finder patterns (all corners except bottom right; overwrites some timing modules)
    this.drawFinderPattern(3, 3);
    this.drawFinderPattern(this.size - 4, 3);
    this.drawFinderPattern(3, this.size - 4);
    
    // Draw numerous alignment patterns
    const alignPatPos: TInt[] = this.getAlignmentPatternPositions();
    const numAlign: TInt = alignPatPos.length;
    
    for (let i = 0; i < numAlign; i++) {
      for (let j = 0; j < numAlign; j++) {
        // Don't draw on the three finder corners
        if (!(i === 0 && j === 0 || i === 0 && j === numAlign - 1 || i === numAlign - 1 && j === 0)) {
          this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
        }
      }
    }
    
    // Draw configuration data
    this.drawFormatBits(0); // Dummy mask value; overwritten later in the constructor
    this.drawVersion();
  }
  
  // Draws two copies of the format bits (with its own error correction code)
  // based on the given mask and this object's error correction level field.
  private drawFormatBits(mask: TInt): void {
    // Calculate error correction code and pack bits
    const data: TInt = this.errorCorrectionLevel.formatBits << 3 | mask; // errCorrLvl is uint2, mask is uint3
    let rem: TInt = data;
    
    for (let i = 0; i < 10; i++) {
      rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    }
    
    const bits = (data << 10 | rem) ^ 0x5412; // uint15
    
    assert(bits >>> 15 === 0);
    
    // Draw first copy
    for (let i = 0; i <= 5; i++) {
      this.setFunctionModule(8, i, getBit(bits, i));
    }
    
    this.setFunctionModule(8, 7, getBit(bits, 6));
    this.setFunctionModule(8, 8, getBit(bits, 7));
    this.setFunctionModule(7, 8, getBit(bits, 8));
    
    for (let i = 9; i < 15; i++) {
      this.setFunctionModule(14 - i, 8, getBit(bits, i));
    }
    
    // Draw second copy
    for (let i = 0; i < 8; i++) {
      this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
    }
    
    for (let i = 8; i < 15; i++) {
      this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
    }
    
    this.setFunctionModule(8, this.size - 8, true); // Always dark
  }
  
  // Draws two copies of the version bits (with its own error correction code),
  // based on this object's version field, iff 7 <= version <= 40.
  private drawVersion(): void {
    if (this.version < 7) {
      return;
    }
    
    // Calculate error correction code and pack bits
    let rem: TInt = this.version; // version is uint6, in the range [7, 40]
    
    for (let i = 0; i < 12; i++) {
      rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
    }
    
    const bits: TInt = this.version << 12 | rem; // uint18
    
    assert(bits >>> 18 === 0);
    
    // Draw two copies
    for (let i = 0; i < 18; i++) {
      const color: boolean = getBit(bits, i);
      const a: TInt = this.size - 11 + i % 3;
      const b: TInt = Math.floor(i / 3);
      
      this.setFunctionModule(a, b, color);
      this.setFunctionModule(b, a, color);
    }
  }
  
  // Draws a 9*9 finder pattern including the border separator,
  // with the center module at (x, y). Modules can be out of bounds.
  private drawFinderPattern(x: TInt, y: TInt): void {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist: TInt = Math.max(Math.abs(dx), Math.abs(dy)); // Chebyshev/infinity norm
        const xx: TInt = x + dx;
        const yy: TInt = y + dy;
        
        if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) {
          this.setFunctionModule(xx, yy, dist !== 2 && dist !== 4);
        }
      }
    }
  }
  
  // Draws a 5*5 alignment pattern, with the center module
  // at (x, y). All modules must be in bounds.
  private drawAlignmentPattern(x: TInt, y: TInt): void {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
      }
    }
  }
  
  // Sets the color of a module and marks it as a function module.
  // Only used by the constructor. Coordinates must be in bounds.
  private setFunctionModule(x: TInt, y: TInt, isDark: boolean): void {
    this.modules[y][x] = isDark;
    this.isFunction[y][x] = true;
  }
  
  /* -- Private helper methods for constructor: Codewords and masking -- */
  
  // Returns a new byte string representing the given data with the appropriate error correction
  // codewords appended to it, based on this object's version and error correction level.
  private addEccAndInterleave(data: readonly TByte[]): TByte[] {
    const ver: TInt = this.version;
    const ecl: Ecc = this.errorCorrectionLevel;
    
    if (data.length !== getNumDataCodewords(ver, ecl)) {
      throw new RangeError('Invalid argument');
    }
    
    // Calculate parameter numbers
    const numBlocks: TInt = NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    const blockEccLen: TInt = ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
    const rawCodewords: TInt = Math.floor(getNumRawDataModules(ver) / 8);
    const numShortBlocks: TInt = numBlocks - rawCodewords % numBlocks;
    const shortBlockLen: TInt = Math.floor(rawCodewords / numBlocks);
    
    // Split data into blocks and append ECC to each block
    const blocks: TByte[][] = [];
    const rsDiv: TByte[] = reedSolomonComputeDivisor(blockEccLen);
    
    for (let i = 0, k = 0; i < numBlocks; i++) {
      const dat: TByte[] = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
      
      k += dat.length;
      const ecc: TByte[] = reedSolomonComputeRemainder(dat, rsDiv);
      
      if (i < numShortBlocks) {
        dat.push(0);
      }
      
      blocks.push(dat.concat(ecc));
    }
    
    // Interleave (not concatenate) the bytes from every block into a single sequence
    const result: TByte[] = [];
    
    for (let i = 0; i < blocks[0].length; i++) {
      blocks.forEach((block, j) => {
        // Skip the padding byte in short blocks
        if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) {
          result.push(block[i]);
        }
      });
    }
    
    assert(result.length === rawCodewords);
    
    return result;
  }
  
  // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
  // data area of this QR Code. Function modules need to be marked off before this is called.
  private drawCodewords(data: readonly TByte[]): void {
    if (data.length !== Math.floor(getNumRawDataModules(this.version) / 8)) {
      throw new RangeError('Invalid argument');
    }
    
    let i: TInt = 0; // Bit index into the data
    
    // Do the funny zigzag scan
    for (let right = this.size - 1; right >= 1; right -= 2) { // Index of right column in each column pair
      if (right === 6) {
        right = 5;
      }
      
      for (let vert = 0; vert < this.size; vert++) { // Vertical counter
        for (let j = 0; j < 2; j++) {
          const x: TInt = right - j; // Actual x coordinate
          const upward: boolean = ((right + 1) & 2) === 0;
          const y: TInt = upward ? this.size - 1 - vert : vert; // Actual y coordinate
          
          if (!this.isFunction[y][x] && i < data.length * 8) {
            this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
            i++;
          }
          // If this QR Code has any remainder bits (0 to 7), they were assigned as
          // 0/false/light by the constructor and are left unchanged by this method
        }
      }
    }
    
    assert(i === data.length * 8);
  }
  
  // XORs the codeword modules in this QR Code with the given mask pattern.
  // The function modules must be marked and the codeword bits must be drawn
  // before masking. Due to the arithmetic of XOR, calling applyMask() with
  // the same mask value a second time will undo the mask. A final well-formed
  // QR Code needs exactly one (not zero, two, etc.) mask applied.
  private applyMask(mask: TInt): void {
    if (mask < 0 || mask > 7) {
      throw new RangeError('Mask value out of range');
    }
    
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let invert: boolean;
        
        switch (mask) {
        case 0:
          invert = (x + y) % 2 === 0;
          
          break;
        case 1:
          invert = y % 2 === 0;
          
          break;
        case 2:
          invert = x % 3 === 0;
          
          break;
        case 3:
          invert = (x + y) % 3 === 0;
          
          break;
        case 4:
          invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
          
          break;
        case 5:
          invert = x * y % 2 + x * y % 3 === 0;
          
          break;
        case 6:
          invert = (x * y % 2 + x * y % 3) % 2 === 0;
          
          break;
        case 7:
          invert = ((x + y) % 2 + x * y % 3) % 2 === 0;
          
          break;
        default:
          throw new Error('Unreachable');
        }
        
        if (!this.isFunction[y][x] && invert) {
          this.modules[y][x] = !this.modules[y][x];
        }
      }
    }
  }
  
  // Calculates and returns the penalty score based on state of this QR Code's current modules.
  // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
  private getPenaltyScore(): TInt {
    let result: TInt = 0;
    
    // Adjacent modules in row having same color, and finder-like patterns
    for (let y = 0; y < this.size; y++) {
      let runColor = false;
      let runX = 0;
      const runHistory = [0, 0, 0, 0, 0, 0, 0];
      
      for (let x = 0; x < this.size; x++) {
        if (this.modules[y][x] == runColor) {
          runX++;
          
          if (runX === 5) {
            result += PENALTY_N1;
          } else if (runX > 5) {
            result++;
          }
        } else {
          this.finderPenaltyAddHistory(runX, runHistory);
          
          if (!runColor) {
            result += this.finderPenaltyCountPatterns(runHistory) * PENALTY_N3;
          }
          
          runColor = this.modules[y][x];
          runX = 1;
        }
      }
      
      result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * PENALTY_N3;
    }
    
    // Adjacent modules in column having same color, and finder-like patterns
    for (let x = 0; x < this.size; x++) {
      let runColor = false;
      let runY = 0;
      const runHistory = [0, 0, 0, 0, 0, 0, 0];
      
      for (let y = 0; y < this.size; y++) {
        if (this.modules[y][x] == runColor) {
          runY++;
          
          if (runY === 5) {
            result += PENALTY_N1;
          } else if (runY > 5) {
            result++;
          }
        } else {
          this.finderPenaltyAddHistory(runY, runHistory);
          
          if (!runColor) {
            result += this.finderPenaltyCountPatterns(runHistory) * PENALTY_N3;
          }
          
          runColor = this.modules[y][x];
          runY = 1;
        }
      }
      
      result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * PENALTY_N3;
    }
    
    // 2*2 blocks of modules having same color
    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const color: boolean = this.modules[y][x];
        
        if (color == this.modules[y][x + 1]
          && color == this.modules[y + 1][x]
          && color == this.modules[y + 1][x + 1]) {
          result += PENALTY_N2;
        }
      }
    }
    
    // Balance of dark and light modules
    let dark: TInt = 0;
    
    for (const row of this.modules) {
      dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
    }
    
    const total: TInt = this.size * this.size; // Note that size is odd, so dark/total != 1/2
    // Compute the smallest integer k >= 0 such that (45-5k)% <= dark/total <= (55+5k)%
    const k: TInt = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
    
    assert(0 <= k && k <= 9);
    result += k * PENALTY_N4;
    assert(0 <= result && result <= 2568888); // Non-tight upper bound based on default values of PENALTY_N1, ..., N4
    
    return result;
  }
  
  /* -- Private helper functions -- */
  
  // Returns an ascending list of positions of alignment patterns for this version number.
  // Each position is in the range [0,177), and are used on both the x and y axes.
  // This could be implemented as lookup table of 40 variable-length lists of integers.
  private getAlignmentPatternPositions(): TInt[] {
    if (this.version === 1) {
      return [];
    }
    
    const numAlign: TInt = Math.floor(this.version / 7) + 2;
    const step: TInt = Math.floor((this.version * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2;
    const result: TInt[] = [6];
    
    for (let pos = this.size - 7; result.length < numAlign; pos -= step) {
      result.splice(1, 0, pos);
    }
    
    return result;
  }
  
  // Can only be called immediately after a light run is added, and
  // returns either 0, 1, or 2. A helper function for getPenaltyScore().
  private finderPenaltyCountPatterns(runHistory: readonly TInt[]): TInt {
    const n: TInt = runHistory[1];
    
    assert(n <= this.size * 3);
    const core: boolean = n > 0 && runHistory[2] === n && runHistory[3] === n * 3 && runHistory[4] === n && runHistory[5] === n;
    
    return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
  }
  
  // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
  private finderPenaltyTerminateAndCount(currentRunColor: boolean, currentRunLength: TInt, runHistory: TInt[]): TInt {
    if (currentRunColor) { // Terminate dark run
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      currentRunLength = 0;
    }
    
    currentRunLength += this.size; // Add light border to final run
    this.finderPenaltyAddHistory(currentRunLength, runHistory);
    
    return this.finderPenaltyCountPatterns(runHistory);
  }
  
  // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
  private finderPenaltyAddHistory(currentRunLength: TInt, runHistory: TInt[]): void {
    if (runHistory[0] === 0) {
      currentRunLength += this.size;
    } // Add light border to initial run
    
    runHistory.pop();
    runHistory.unshift(currentRunLength);
  }
}
