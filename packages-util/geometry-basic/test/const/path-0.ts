import {
  ITestPath
} from '../types';

export default {
  path: [],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: null,
  bbox: [[0, 0], [0, 0]],
  ecp: null
} satisfies ITestPath;