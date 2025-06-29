import { EQrStyle } from '../enum';
import Contour from '../class/contour';
import Bitmask from '../class/bitmask';

// Special case method to calculate contours for the styles
// (currently only scanlines) where shapes follow the horizontal
// image grid.
export default function calculateHorizontalStyleContour(bitmask: Bitmask, margin: number, style: EQrStyle): Contour {
  if (style !== EQrStyle.SCAN_LINES) {
    throw Error(`Unsupported horizontal render style: ${style}`);
  }
  
  const contour = new Contour();
  const lineOffWidth = 0.06;
  const lineOnWidth = 0.9;
  
  for (let y = 0; y < bitmask.height; y++) {
    let start = 0;
    let end = bitmask.width;
    
    if (bitmask.width > 16 && bitmask.height > 16) {
      // Check if we are inside a PDP area, because they have already been handled separately.
      if (y < 8) {
        start = 8;
        end = bitmask.width - 8;
      } else if (y > bitmask.height - 8) {
        start = 8;
      }
    }
    
    // We need to slightly move the "off" scanline from the vertical middle to make
    // the code easier to scan. Vertical displacement:
    const vOffDisplace = 0.1;
    const newShapePathSpec = [];
    let reversePathSpec = [];
    const newDotPathSpec = [];
    let capRadius = lineOffWidth / 2;
    let vDisplace = vOffDisplace;
    
    if (bitmask.get(start, y)) {
      capRadius = lineOnWidth / 2;
      vDisplace = 0;
    }
    
    newShapePathSpec.push(`M${(start + capRadius + margin).toFixed(3)} ${(y + 0.5 + capRadius + vDisplace + margin).toFixed(3)}`);
    newShapePathSpec.push(`a${capRadius} ${capRadius} 0 0 1 0 ${(capRadius * -2).toFixed(3)}`);
    newShapePathSpec.push(`h${(0.8 - capRadius).toFixed(3)}`);
    reversePathSpec.push('h-0.8');
    
    for (let x = start + 1; x < end; x++) {
      const vDelta = (lineOnWidth - lineOffWidth) / 2;
      
      if (bitmask.get(x, y) && !bitmask.get(x - 1, y) && !bitmask.get(x + 1, y) && x < end - 1) {
        newDotPathSpec.push(`M${(x - 0.2 + margin).toFixed(3)} ${(y + 0.5 - lineOffWidth / 2 + vOffDisplace + margin).toFixed(3)}`);
        newDotPathSpec.push(`c0.2 0 0.2 ${(vDelta * -1 - vOffDisplace).toFixed(3)} 0.4 ${(vDelta * -1 - vOffDisplace).toFixed(3)}`);
        newDotPathSpec.push('h0.6');
        newDotPathSpec.push(`c0.2 0 0.2 ${(vDelta + vOffDisplace).toFixed(3)} 0.4 ${(vDelta + vOffDisplace).toFixed(3)}`);
        newDotPathSpec.push(`v${lineOffWidth}`);
        newDotPathSpec.push(`c-0.2 0 -0.2 ${(vDelta - vOffDisplace).toFixed(3)} -0.4 ${(vDelta - vOffDisplace).toFixed(3)}`);
        newDotPathSpec.push('h-0.6');
        newDotPathSpec.push(`c-0.2 0 -0.2 ${(vDelta * -1 + vOffDisplace).toFixed(3)} -0.4 ${(vDelta * -1 + vOffDisplace).toFixed(3)}`);
        newDotPathSpec.push('z');
        newShapePathSpec.push(`v${lineOffWidth}`);
        newShapePathSpec.push(...reversePathSpec.reverse());
        reversePathSpec = [];
        newShapePathSpec.push('z');
        newShapePathSpec.push(`M${(x + 1.2 + margin).toFixed(3)} ${(y + 0.5 + lineOffWidth / 2 + vOffDisplace + margin).toFixed(3)}`);
        newShapePathSpec.push(`v${-1 * lineOffWidth}`);
        x += 1;
      } else if (bitmask.get(x, y) && !bitmask.get(x - 1, y)) {
        newShapePathSpec.push(`c0.2 0 0.2 ${(vDelta * -1 - vOffDisplace).toFixed(3)} 0.4 ${(vDelta * -1 - vOffDisplace).toFixed(3)}`);
        reversePathSpec.push(`c-0.2 0 -0.2 ${(vDelta * -1 + vOffDisplace).toFixed(3)} -0.4 ${(vDelta * -1 + vOffDisplace).toFixed(3)}`);
      } else if (!bitmask.get(x, y) && bitmask.get(x - 1, y)) {
        newShapePathSpec.push(`c0.2 0 0.2 ${(vDelta + vOffDisplace).toFixed(3)} 0.4 ${(vDelta + vOffDisplace).toFixed(3)}`);
        reversePathSpec.push(`c-0.2 0 -0.2 ${(vDelta - vOffDisplace).toFixed(3)} -0.4 ${(vDelta - vOffDisplace).toFixed(3)}`);
      } else {
        newShapePathSpec.push('h0.4');
        reversePathSpec.push('h-0.4');
      }
      
      newShapePathSpec.push('h0.6');
      reversePathSpec.push('h-0.6');
    }
    
    newShapePathSpec.push('h0.2');
    reversePathSpec.push('h-0.2');
    capRadius = lineOffWidth / 2;
    
    if (bitmask.get(end - 1, y)) {
      capRadius = lineOnWidth / 2;
    }
    
    newShapePathSpec.push(`h${-1 * capRadius}`);
    reversePathSpec.push(`h${capRadius}`);
    newShapePathSpec.push(`a${capRadius} ${capRadius} 0 0 1 0 ${capRadius * 2}`);
    newShapePathSpec.push(...reversePathSpec.reverse());
    newShapePathSpec.push('z');
    contour.shapes = contour.shapes.concat(newShapePathSpec);
    contour.dots = contour.dots.concat(newDotPathSpec);
  }
  
  return contour;
}
