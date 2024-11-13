import {
  TStory
} from './types';

export default {
  args: {
    count: 10,
    density: false,
    shape: 'random',
    color: 'random',
    opacity: [20, 70],
    stroke: {
      color: '#fff',
      width: 4
    },
    radius: [40, 120],
    animateMove: {
      speed: 64,
      bounceOnEdge: true
    },
    animateRadius: 10,
    clickRemove: 2,
    clickGenerate: 3
  }
} satisfies TStory;
