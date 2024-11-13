import {
  colord
} from 'colord';

export default function fadeColor(color: string): string {
  const {
    h,
    s,
    l,
    a
  } = colord(color).toHsl();
  
  return a > 0 ? `hsl(${h} ${s}% ${l}% / ${a * 33}%)` : `hsl(${h} ${s * 0.8}% ${l * 1.3}%)`;
}
