import {
  MarkingConfigItem
} from '../../../src';

export default [{
  path: [
    [99, 199],
    [52, 482],
    [233, 465],
    [242, 339],
    [105.9026, 329.2788],
    [249, 260],
    [228.692, 204.0931]
  ],
  styleConfig: {
    border: {
      color: 'hsl(0 36% 50%)'
    },
    point: {
      type: 'square',
      lineColor: 'hsl(48 100% 50%)',
      fillColor: 'hsl(48 100% 50%)'
    },
    fill: {
      color: 'hsla(320 95% 59% / 30%)'
    }
  }
}, {
  path: [[371, 212],
    [283, 467],
    [327, 469],
    [390, 262],
    [423, 463],
    [480, 459],
    [406, 212]],
  styleConfig: {
    border: {
      color: 'hsl(288 100% 50%)'
    }
  }
}, {
  path: [
    [521, 208],
    [511, 463],
    [690, 427],
    [699, 249]
  ],
  styleConfig: {
    border: {
      color: 'hsl(48 100% 50%)'
    },
    fill: {
      color: 'hsl(50 100% 63% / 80%)'
    }
  }
}] satisfies MarkingConfigItem[];
