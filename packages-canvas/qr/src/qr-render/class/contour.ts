// Data class holding four SVG path-specs that make up a QR code pattern.
// There are separate properties for the inner and outer parts of the position
// detection pattern, for 1x1 blocks in the pattern and for all larger shapes.
// This separation is for later ease in distinct coloration.
// The path-specs are held as arrays instead of strings so their component parts
// can be more easily iterated and manipulated. This is necessary for the
// application of shape styles.
export default class Contour {
  pdpOuter: string[] = [];
  pdpInner: string[] = [];
  dots: string[] = [];
  shapes: string[] = [];
}
