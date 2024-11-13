import {
  TStory
} from './types';

export default {
  args: {
    count: 64,
    link: true,
    // radius: [10, 20],
    // // color: '#fff',
    // // stroke: {
    // //   width: 1,
    // //   color: 'random'
    // // },
    // animateRadius: true,
    // animateOpacity: true,
    // animateMove: false,
    animateMove: {
      speed: 100,
      bounce: true,
      bounceOnEdge: true
    },
    // clickRepulse: true,
    // clickRepulse: {
    //   radius: 160,
    //   duration: 400
    // },
    // clickBubble: true,
    // // hoverLink: true
    hoverRepulse: true
    // hoverBubble: true,
    // hoverBubble: {
    //   distance: 400,
    //   diffRadius: -8,
    //   diffOpacity: -30
    // },
    // clickRemove: 3,
    // clickGenerate: 4,
    // clickBubble: {
    //   distance: 250,
    //   radius: 10,
    //   duration: 2,
    //   opacity: 40,
    //   speed: 3
    // }
  }
} satisfies TStory;
