import {
  IModelState
} from '../types';

export default function createInitialState(): IModelState {
  return {
    dark: false,
    text: false,
    seedGray: 'hsl(285 46% 28%)',
    seedColorful: 'hsl(337 100% 50%)',
    grayscale: false,
    invert: false
  };
}
