import { EQrStyle } from '../enum';
import Contour from '../class/contour';
import Bitmask from '../class/bitmask';
import PRNG from '../class/prng';

import calculateHorizontalStyleContour from './calculate-horizontal-style-contour';
import calculateTileStyleContour from './calculate-tile-style-contour';
import calculateShapeContour from './calculate-shape-contour';
import makePathSpecRound from './make-path-spec-round';
import addJitterToPathSpec from './add-jitter-to-path-spec';
import compactPathSpec from './compact-path-spec';

// Overarching method that turns a 2D bitmask into a set of contour pathspecs.
// `margin` is an offset that is added to all x and y coordinates in the output.
// It defaults to 1 to accommodate jitter and mosaic styles that have elements
// randomly extending slightly outside the basic QR code area.
export default function calculateContour(bitmask: Bitmask, margin = 1, style: EQrStyle): Contour {
  const contour = new Contour();
  
  if (bitmask.width > 16 && bitmask.height > 16) {
    // This is where we build the PDP contours, regardless of style. Skipped for
    // bitmasks below a size threshold - those are assumed to not be valid QR codes.
    // I also tried rendering the PDP paths as individual "pixels" in the dots and
    // mosaic styles, but that led to bad scanning compatibility, so we take care
    // to keep those more solid than the rest of the code.
    for (let offset of [[margin, margin], [bitmask.width + margin - 7, margin], [margin, bitmask.height + margin - 7]]) {
      contour.pdpOuter.push('M' + offset[0] + ' ' + offset[1]);
      contour.pdpOuter.push(...Array(7).fill('h1'));
      contour.pdpOuter.push(...Array(7).fill('v1'));
      contour.pdpOuter.push(...Array(7).fill('h-1'));
      contour.pdpOuter.push(...Array(7).fill('v-1'));
      contour.pdpOuter.push('z');
      contour.pdpOuter.push('M' + (offset[0] + 1) + ' ' + (offset[1] + 1));
      contour.pdpOuter.push(...Array(5).fill('v1'));
      contour.pdpOuter.push(...Array(5).fill('h1'));
      contour.pdpOuter.push(...Array(5).fill('v-1'));
      contour.pdpOuter.push(...Array(5).fill('h-1'));
      contour.pdpOuter.push('z');
      contour.pdpInner.push('M' + (offset[0] + 2) + ' ' + (offset[1] + 2));
      contour.pdpInner.push(...Array(3).fill('h1'));
      contour.pdpInner.push(...Array(3).fill('v1'));
      contour.pdpInner.push(...Array(3).fill('h-1'));
      contour.pdpInner.push(...Array(3).fill('v-1'));
      contour.pdpInner.push('z');
    }
    
    if ([EQrStyle.DOTS, EQrStyle.ROUNDED, EQrStyle.CONFETTI, EQrStyle.SCAN_LINES].includes(style)) {
      contour.pdpInner = makePathSpecRound(contour.pdpInner);
      contour.pdpOuter = makePathSpecRound(contour.pdpOuter);
    }
  }
  
  let newContour;
  
  if (style === EQrStyle.SCAN_LINES) {
    newContour = calculateHorizontalStyleContour(bitmask, margin, style);
  } else if ([EQrStyle.DOTS, EQrStyle.MOSAIC, EQrStyle.CONFETTI].includes(style)) {
    newContour = calculateTileStyleContour(bitmask, margin, style);
  } else {
    newContour = calculateShapeContour(bitmask, margin);
  }
  
  contour.dots = newContour.dots;
  contour.shapes = newContour.shapes;
  
  if (style === EQrStyle.ROUNDED) {
    contour.shapes = makePathSpecRound(contour.shapes);
    contour.dots = makePathSpecRound(contour.dots);
  }
  
  if (style === EQrStyle.JITTER_LIGHT || style === EQrStyle.JITTER_HEAVY) {
    let jitterValue = 0.0;
    
    // Suitable jitter values that still lead to good scanning compatibility
    // have been derived experimentally. Customize as you see fit.
    if (style === EQrStyle.JITTER_HEAVY) {
      jitterValue = 0.15;
    } else if (style === EQrStyle.JITTER_LIGHT) {
      jitterValue = 0.07;
    }
    
    const prng = new PRNG(1);
    
    // It's important to jitterize the shapes and dots first, as they are different for every QR code.
    // Reusing the same PRNG afterwards for the PDP paths ensures that they get different jitter values
    // for different QR codes and thus not look the same every time.
    contour.shapes = addJitterToPathSpec(contour.shapes, jitterValue, prng);
    contour.dots = addJitterToPathSpec(contour.dots, jitterValue, prng);
    contour.pdpInner = addJitterToPathSpec(contour.pdpInner, jitterValue, prng);
    contour.pdpOuter = addJitterToPathSpec(contour.pdpOuter, jitterValue, prng);
  } else {
    contour.shapes = compactPathSpec(contour.shapes);
    contour.dots = compactPathSpec(contour.dots);
    contour.pdpInner = compactPathSpec(contour.pdpInner);
    contour.pdpOuter = compactPathSpec(contour.pdpOuter);
  }
  
  return contour;
}
