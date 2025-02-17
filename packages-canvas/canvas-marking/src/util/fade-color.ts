import {
  fadeOut
} from '@kcuf/mere-color';

export default function fadeColor(color: string): string {
  return fadeOut(color, 65, 5);
}
