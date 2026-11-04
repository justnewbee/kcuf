import {
  IFluidPointer
} from '../types';

export default function createPointer(): IFluidPointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: {
      r: 0,
      g: 0,
      b: 0
    }
  };
}
