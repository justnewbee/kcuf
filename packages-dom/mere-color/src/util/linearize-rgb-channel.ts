/**
 * Converts an RGB channel [0-255] to its linear light (un-companded) form [0-1].
 * Linearized RGB values are widely used for color space conversions and contrast calculations
 */
export default function linearizeRgbChannel(value: number): number {
  const channel = value / 255;
  
  return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}
