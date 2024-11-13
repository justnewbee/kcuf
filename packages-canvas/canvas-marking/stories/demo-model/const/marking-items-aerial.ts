import {
  MarkingConfigItem,
  MarkingBorderStyleDiff
} from '../../../src';

const DIFF_HOVER: MarkingBorderStyleDiff = {
  outerColor: 'hsl(177 100% 50%)',
  outerWidth: 2
};
const DIFF_FULL: MarkingBorderStyleDiff = {
  color: 'hsl(0 50% 48%)',
  outerColor: 'hsl(48 100% 50%)',
  outerWidth: 2
};
const DIFF_ONE: MarkingBorderStyleDiff = {
  ...DIFF_FULL,
  noInsertion: true
};

export default [{
  path: [
    [222, 633],
    [200, 1656],
    [2611, 1656],
    [2611, 1428],
    [2828, 1424],
    [2832, 1225],
    [2954, 1229],
    [2954, 1192],
    [3300, 1192],
    [3741, 920],
    [3745, 647]
  ],
  fillStyle: {
    color: 0.03
  },
  borderDiff: {
    hover: DIFF_HOVER,
    [1 as number]: DIFF_ONE,
    [4 as number]: DIFF_ONE
  }
}, {
  path: [
    [211, 1888],
    [1003, 1892],
    [1010, 2444],
    [211, 2436]
  ],
  fillStyle: {
    color: 0.03
  },
  borderDiff: {
    hover: DIFF_HOVER,
    all: DIFF_FULL
  }
}, {
  path: [
    [1238, 1888],
    [1246, 2337],
    [1474, 2337],
    [1477, 2124],
    [2136, 2116],
    [2133, 1888]
  ],
  fillStyle: {
    color: 0.03
  }
}, { // 以上屋顶，以下障碍物
  path: [
    [1489, 750],
    [1489, 798],
    [2424, 795],
    [2424, 754]
  ],
  borderStyle: {
    color: 'hsl(20 100% 70%)'
  }
}, {
  path: [
    [1400, 865],
    [1404, 1402],
    [1489, 1413],
    [1481, 872]
  ],
  borderStyle: {
    color: 'hsl(120 100% 50%)'
  }
}, {
  path: [
    [3053, 728],
    [3057, 868],
    [3200, 868],
    [3197, 725]
  ],
  borderStyle: {
    color: 'hsl(240 100% 50%)'
  }
}, {
  path: [
    [3406, 736],
    [3406, 865],
    [3546, 865],
    [3543, 736]
  ],
  borderStyle: {
    color: 'hsl(60 100% 50%)'
  }
}, {
  path: [
    [531, 1535],
    [664, 1535],
    [664, 1656],
    [528, 1652]
  ],
  borderStyle: {
    color: 'hsl(279 100% 50%)'
  }
}, {
  path: [
    [1448, 2124],
    [1227, 2124],
    [1231, 1884],
    [1448, 1888]
  ],
  borderStyle: {
    color: 'hsl(200 100% 50%)'
  }
}, {
  path: [
    [406, 1965],
    [410, 2348],
    [793, 2348],
    [793, 1969]
  ],
  borderStyle: {
    color: 'hsl(330 100% 60%)'
  }
}, {
  path: [
    [1463, 1892],
    [1466, 1998],
    [1805, 2006],
    [1809, 1888]
  ],
  borderStyle: {
    color: 'hsl(210 100% 60%)'
  }
}, {
  path: [
    [1925, 2734],
    [2726, 2182]
  ],
  borderStyle: {
    color: 'hsl(0 100% 50%)'
  }
}] satisfies MarkingConfigItem<void>[];
