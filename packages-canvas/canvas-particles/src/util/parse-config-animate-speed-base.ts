import {
  IConfigAnimateSpeedBase
} from '../types';
import {
  SPEED_PER_FRAMES
} from '../const';

export default function parseConfigAnimateSpeedBase(value: undefined | boolean | null | number | IConfigAnimateSpeedBase, defaultValue: Required<IConfigAnimateSpeedBase>): Required<IConfigAnimateSpeedBase> | null {
  if (!value) {
    return null;
  }
  
  const {
    speed: defaultSpeed,
    speedSync: defaultSpeedSync
  } = defaultValue;
  let speed = defaultSpeed;
  let speedSync = defaultSpeedSync;
  
  if (typeof value === 'number') {
    speed = value;
  } else if (value !== true) {
    speed = value.speed ?? defaultSpeed;
    speedSync = value.speedSync ?? defaultSpeedSync;
  }
  
  if (speed <= 0) {
    return null;
  }
  
  return {
    speed: speed / SPEED_PER_FRAMES,
    speedSync
  };
}
