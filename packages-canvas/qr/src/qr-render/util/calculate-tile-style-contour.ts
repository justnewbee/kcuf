import {
  EQrStyle
} from '../enum';
import Contour from '../class/contour';
import Bitmask from '../class/bitmask';
import PRNG from '../class/prng';

// Special case method to calculate contours for the styles
// where shapes are not contiguous. This also skips the PDP.
export default function calculateTileStyleContour(bitmask: Bitmask, margin: number, style: EQrStyle): Contour {
  if (![EQrStyle.DOTS, EQrStyle.MOSAIC, EQrStyle.CONFETTI].includes(style)) {
    throw Error(`Unsupported tiled render style: ${style}`);
  }
  
  const confettiShapes = [
    [ // circle
      'M 0.5 0.1',
      'A 0.4 0.4 0 0 1 0.5 0.9',
      'A 0.4 0.4 0 0 1 0.5 0.1'
    ],
    [ // rectangle
      'M 0.1 0.15',
      'L 0.9 0.15',
      'L 0.9 0.85',
      'L 0.1 0.85',
      'L 0.1 0.15'
    ],
    [ // star
      'M 0.68 0.254',
      'Q 1.21 0.284 0.786 0.58',
      'Q 0.9275 1.0925 0.498 0.801',
      'Q 0.0545 1.1 0.212 0.606',
      'Q -0.208 0.269 0.312 0.259',
      'Q 0.5 -0.25 0.68 0.254'
    ],
    [ // heart
      'M 0.5 0.3',
      'C 1.2 -0.1 1 0.7 0.5 1',
      'C 0 0.7 -0.2 -0.1 0.5 0.3'
    ],
    [ // diamond
      'M 0.5 0',
      'Q 0.65 0.35 1 0.5',
      'Q 0.65 0.65 0.5 1',
      'Q 0.35 0.65 0 0.5',
      'Q 0.35 0.35 0.5 0'
    ],
    [ // shamrock
      'M 0.45 0.45',
      'A 0.23 0.23 0 1 1 0.55 0.45',
      'A 0.23 0.23 0 1 1 0.54 0.48',
      'L 0.7 0.95',
      'L 0.3 0.95',
      'L 0.46 0.48',
      'A 0.23 0.23 0 1 1 0.45 0.45'
    ],
    [ // lemon
      'M 0.5 0',
      'Q 1.5 0.5 0.5 1',
      'Q -0.5 0.5 0.5 0'
    ]
  ];
  const contour = new Contour();
  const prng = new PRNG(1);
  // Rotate a point around (0.5, 0.5) by angle in radians
  const rotatePoint = (x, y, angle) => {
    const rotatedX = 0.5 + (x - 0.5) * Math.cos(angle) - (y - 0.5) * Math.sin(angle);
    const rotatedY = 0.5 + (x - 0.5) * Math.sin(angle) + (y - 0.5) * Math.cos(angle);
    
    return [rotatedX, rotatedY];
  };
  
  for (let y = 0; y < bitmask.height; y++) {
    for (let x = 0; x < bitmask.width; x++) {
      if (bitmask.width > 16 && bitmask.height > 16) {
        // Check if we are inside a PDP area, because they have already been handled separately.
        if ((x < 8 && y < 8)
          || (x < 8 && y > bitmask.height - 8)
          || (x > bitmask.width - 8 && y < 8)) {
          continue;
        }
      }
      
      if (bitmask.get(x, y)) {
        const newPathSpec = [];
        
        if (style === EQrStyle.DOTS) {
          newPathSpec.push(`M${x + margin + 0.5} ${y + margin}`);
          newPathSpec.push('a0.5 0.5 0 0 1 0.5 0.5');
          newPathSpec.push('a0.5 0.5 0 0 1 -0.5 0.5');
          newPathSpec.push('a0.5 0.5 0 0 1 -0.5 -0.5');
          newPathSpec.push('a0.5 0.5 0 0 1 0.5 -0.5');
          newPathSpec.push('z');
        } else if (style === EQrStyle.MOSAIC) {
          // For the mosaic style, we jury-rig a pseudo-random rotation for each pixel.
          const size = 0.9; // relative to grid size
          const maxAngle = Math.PI * 0.03;
          const angle = (prng.next() * 2 - 1) * maxAngle;
          
          newPathSpec.push(`M${x + margin} ${y + margin}`);
          const tileCorners = [
            rotatePoint(0.5 - (size / 2), 0.5 - (size / 2), angle),
            rotatePoint(0.5 + (size / 2), 0.5 - (size / 2), angle),
            rotatePoint(0.5 + (size / 2), 0.5 + (size / 2), angle),
            rotatePoint(0.5 - (size / 2), 0.5 + (size / 2), angle)
          ];
          
          newPathSpec.push(`m${tileCorners[0][0].toPrecision(3)} ${tileCorners[0][1].toPrecision(3)}`);
          newPathSpec.push(`l${(tileCorners[1][0] - tileCorners[0][0]).toPrecision(3)} ${(tileCorners[1][1] - tileCorners[0][1]).toPrecision(3)}`);
          newPathSpec.push(`l${(tileCorners[2][0] - tileCorners[1][0]).toPrecision(3)} ${(tileCorners[2][1] - tileCorners[1][1]).toPrecision(3)}`);
          newPathSpec.push(`l${(tileCorners[3][0] - tileCorners[2][0]).toPrecision(3)} ${(tileCorners[3][1] - tileCorners[2][1]).toPrecision(3)}`);
          newPathSpec.push('z');
        } else if (style === EQrStyle.CONFETTI) {
          newPathSpec.push(`M${x + margin} ${y + margin}`);
          
          const currentShape = confettiShapes[Math.floor(prng.next() * confettiShapes.length)];
          const angle = prng.next() * Math.PI * 2;
          let previousPoint = [0, 0];
          
          for (let segment of currentShape) {
            segment = segment.split(' ');
            
            const formatRotatedPoint = (i, j) => {
              const rotated = rotatePoint(segment[i], segment[j], angle);
              
              return `${(rotated[0] - previousPoint[0]).toPrecision(3)} ${(rotated[1] - previousPoint[1]).toPrecision(3)}`;
            };
            
            if (segment[0] === 'M') {
              const rotated = rotatePoint(segment[1], segment[2], angle);
              
              newPathSpec.push(`m${formatRotatedPoint(1, 2)}`);
              previousPoint = rotated;
            } else if (segment[0] === 'L') {
              const rotated = rotatePoint(segment[1], segment[2], angle);
              
              newPathSpec.push(`l${formatRotatedPoint(1, 2)}`);
              previousPoint = rotated;
            } else if (segment[0] === 'Q') {
              newPathSpec.push(`q${formatRotatedPoint(1, 2)} ${formatRotatedPoint(3, 4)}`);
              previousPoint = rotatePoint(segment[3], segment[4], angle);
            } else if (segment[0] === 'C') {
              newPathSpec.push(`c${formatRotatedPoint(1, 2)} ${formatRotatedPoint(3, 4)} ${formatRotatedPoint(5, 6)}`);
              previousPoint = rotatePoint(segment[5], segment[6], angle);
            } else if (segment[0] === 'A') {
              newPathSpec.push(`a${segment.slice(1, 6).join(' ')} ${formatRotatedPoint(6, 7)}`);
              previousPoint = rotatePoint(segment[6], segment[7], angle);
            }
          }
          
          newPathSpec.push('z');
        }
        
        if (!bitmask.get(x - 1, y) && !bitmask.get(x + 1, y) && !bitmask.get(x, y - 1) && !bitmask.get(x, y + 1)) {
          contour.dots = contour.dots.concat(newPathSpec);
        } else {
          contour.shapes = contour.shapes.concat(newPathSpec);
        }
      }
    }
  }
  
  return contour;
}
