import {
  TStory
} from './types';

export default {
  args: {
    count: 64,
    color: 'all',
    radius: [2, 4],
    opacity: [30, 90],
    animateMove: {
      speed: 20,
      bounceOnEdge: true
    },
    animateOpacity: true,
    animateRadius: 2,
    clickRepulse: {
      distance: 200,
      duration: 0.4
    },
    clickBubble: {
      distance: 250,
      radius: 10,
      opacity: 40,
      speed: 3,
      duration: 2000
    }
  }
} satisfies TStory;