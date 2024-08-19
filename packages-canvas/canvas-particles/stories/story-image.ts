import {
  TStory
} from './types';

export default {
  args: {
    shape: 'image',
    count: 17,
    density: false,
    image: '/aigirl.jpeg',
    radius: 64,
    animateMove: 8,
    opacity: [10, 40],
    animateRadius: 10
  }
} satisfies TStory;