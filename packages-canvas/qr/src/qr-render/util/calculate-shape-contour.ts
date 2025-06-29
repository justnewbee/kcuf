import Contour from '../class/contour';
import Bitmask from '../class/bitmask';

// For styles that do not use individual tiles, this method traces along
// contiguous shapes in the bitmask and builds a contour. Still skips
// the PDP and assumes it is handled separately.
export default function calculateShapeContour(bitmask: Bitmask, margin: number): Contour {
  const contour = new Contour();
  const corners = [];
  const width = bitmask.width + 1;
  const height = bitmask.height + 1;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      corners.push({});
    }
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (Object.keys(corners[y * width + x]).includes('e')) {
        continue;
      }
      
      if (bitmask.get(x, y) === bitmask.get(x - 1, y) && bitmask.get(x, y) === bitmask.get(x, y - 1) && bitmask.get(x, y) === bitmask.get(x - 1, y - 1)) {
        continue;
      } // This corner is not part of any edge.
      
      if (bitmask.get(x, y - 1) || !bitmask.get(x, y)) {
        continue;
      }
      
      let contourX = x;
      let contourY = y;
      let direction = 'e';
      
      while (!corners[contourY * width + contourX][direction]) {
        const prevDirection = direction;
        
        if (direction === 'n') {
          if (bitmask.get(contourX, contourY - 1) && !bitmask.get(contourX - 1, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY - 1];
          } else if (!bitmask.get(contourX, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX + 1, contourY];
            direction = 'e';
          } else if (bitmask.get(contourX - 1, contourY - 1) && bitmask.get(contourX, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX - 1, contourY];
            direction = 'w';
          }
        } else if (direction === 'e') {
          if (bitmask.get(contourX, contourY) && !bitmask.get(contourX, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX + 1, contourY];
          } else if (!bitmask.get(contourX, contourY)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY + 1];
            direction = 's';
          } else if (bitmask.get(contourX, contourY) && bitmask.get(contourX, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY - 1];
            direction = 'n';
          }
        } else if (direction === 's') {
          if (bitmask.get(contourX - 1, contourY) && !bitmask.get(contourX, contourY)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY + 1];
          } else if (!bitmask.get(contourX - 1, contourY)) {
            corners[contourY * width + contourX][direction] = [contourX - 1, contourY];
            direction = 'w';
          } else if (bitmask.get(contourX, contourY) && bitmask.get(contourX - 1, contourY)) {
            corners[contourY * width + contourX][direction] = [contourX + 1, contourY];
            direction = 'e';
          }
        } else if (direction === 'w') {
          if (bitmask.get(contourX - 1, contourY - 1) && !bitmask.get(contourX - 1, contourY)) {
            corners[contourY * width + contourX][direction] = [contourX - 1, contourY];
          } else if (!bitmask.get(contourX - 1, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY - 1];
            direction = 'n';
          } else if (bitmask.get(contourX - 1, contourY) && bitmask.get(contourX - 1, contourY - 1)) {
            corners[contourY * width + contourX][direction] = [contourX, contourY + 1];
            direction = 's';
          }
        }
        
        const next = corners[contourY * width + contourX][prevDirection];
        
        if (!next) {
          break;
        }
        
        contourX = next[0];
        contourY = next[1];
      }
    }
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (bitmask.width > 16 && bitmask.height > 16) {
        // Check if we are inside a PDP area, because they have already been handled separately.
        if ((x < 8 && y < 8)
          || (x < 8 && y > bitmask.height - 8)
          || (x > bitmask.width - 8 && y < 8)) {
          continue;
        }
      }
      
      if (Object.keys(corners[y * width + x]).length == 0) {
        continue;
      }
      
      let direction = Object.keys(corners[y * width + x])[0];
      const newPathSpec = [];
      
      newPathSpec.push(`M${x + margin} ${y + margin}`);
      let contourX = x;
      let contourY = y;
      
      while (corners[contourY * width + contourX][direction]) {
        const next = corners[contourY * width + contourX][direction];
        
        delete corners[contourY * width + contourX][direction];
        
        let pathCommand, pathDelta;
        
        if (next[0] > contourX) {
          direction = 'e';
          pathCommand = 'h';
          pathDelta = 1;
        } else if (next[0] < contourX) {
          direction = 'w';
          pathCommand = 'h';
          pathDelta = -1;
        } else if (next[1] > contourY) {
          direction = 's';
          pathCommand = 'v';
          pathDelta = 1;
        } else if (next[1] < contourY) {
          direction = 'n';
          pathCommand = 'v';
          pathDelta = -1;
        }
        
        newPathSpec.push(pathCommand + pathDelta);
        contourX = next[0];
        contourY = next[1];
      }
      
      // Skip non-shaped paths for serialization
      if (newPathSpec.length <= 2) {
        continue;
      }
      
      // Avoid double-pathing the initial segment
      if (newPathSpec.length % 2 === 0) {
        newPathSpec.pop();
      }
      
      // Technically at this point we should have already returned to the start,
      // but adding an explicit `z` anyway helps with rendering under some
      // circumstances. For pure line segment paths we could use `z` to jump
      // back instead of making the last step before here explicit, but that can
      // interfere with the way we round corners in some styles.
      newPathSpec.push('z');
      
      if (newPathSpec.length === 6 && !newPathSpec[1].startsWith('v')) {
        contour.dots = contour.dots.concat(newPathSpec);
      } else {
        contour.shapes = contour.shapes.concat(newPathSpec);
      }
    }
  }
  
  return contour;
}
