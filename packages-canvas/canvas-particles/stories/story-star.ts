import {
  TStory
} from './types';

export default {
  args: {
    // count: 100,
    shape: 'star',
    color: 'random',
    radius: [3, 8],
    // opacity: 5,
    // attract: {
    //   distance: 100,
    //   rotateX: 200,
    //   rotateY: 300
    // },
    animateMove: {
      speed: 40,
      angle: 0,
      straight: true
    },
    animateRadius: true,
    animateOpacity: true,
    clickRepulse: 100
  }
} satisfies TStory;
