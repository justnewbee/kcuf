import {
  TStory
} from './types';

export default {
  args: {
    shape: 'circle',
    count: 100,
    density: true,
    color: '#fff',
    radius: [2, 10],
    opacity: [5, 50],
    animateMove: {
      speed: 400,
      angle: 90
    },
    animateOpacity: true,
    // hoverBubble: {
    //   distance: 400,
    //   diffRadius: -3,
    //   diffOpacity: 50
    // },
    clickRepulse: true,
    clickBubble: true
  }
} satisfies TStory;
