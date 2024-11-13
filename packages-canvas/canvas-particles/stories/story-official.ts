import {
  TStory
} from './types';

export default {
  args: {
    shape: 'circle',
    count: 16,
    density: true,
    color: '#fff',
    radius: [1, 3],
    opacity: 70,
    link: true,
    animateMove: {
      speed: 40,
      bounceOnEdge: true
    },
    hoverLink: true,
    clickRemove: 2,
    clickGenerate: 4
  }
} satisfies TStory;
