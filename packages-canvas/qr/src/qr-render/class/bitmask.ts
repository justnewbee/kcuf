// Data class holding a rectangular bitmask, accessible as x/y coordinates
// returning boolean values.
export default class Bitmask {
  private readonly array: unknown[];
  width: number;
  height: number;
  
  constructor(width: number, height: number) {
    // if (!Number.isInteger(width) || !Number.isInteger(height)) {
    //   throw Error(`Bitmask: width and height must be integers: ${width}, ${height}`);
    // }
    
    this.width = width;
    this.height = height;
    this.array = new Array(width * height);
    this.wipe(false);
  }
  
  get(x: number, y: number) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw Error(`Bitmask: x and y must be integers: ${x}, ${y}`);
    }
    
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false;
    }
    
    return this.array[y * this.width + x];
  }
  
  set(x: number, y: number, value) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw Error(`Bitmask: x and y must be integers: ${x}, ${y}`);
    }
    
    if (x < 0 || x >= this.width) {
      throw Error(`Bitmask: x must be at least 0 and less than width: ${x}`);
    }
    
    if (y < 0 || y >= this.height) {
      throw Error(`Bitmask: y must be at least 0 and less than height: ${y}`);
    }
    
    this.array[y * this.width + x] = value;
  }
  
  // Fully overwrite the current data with a sequence of boolean
  // values. In the simplest case, call wipe(false) to set all
  // coordinates to false, or provide more values. They will be
  // repeated in sequence as often as needed.
  wipe(...pattern) {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = pattern[i % pattern.length];
    }
  }
}
