import {
  TStory
} from './types';

export default {
  args: {
    shape: 'image',
    count: 5,
    image: {
      src: '/bra.svg',
      aspectRatio: 1
    },
    radius: 24,
    opacity: [10, 70],
    animateMove: 7,
    animateRadius: 2
  }
} satisfies TStory;
