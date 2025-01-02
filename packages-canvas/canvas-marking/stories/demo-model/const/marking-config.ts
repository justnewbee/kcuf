import {
  MarkingItemConfig
} from '../../../src';

export const CREATE_CONFIG_LINE: MarkingItemConfig = {
  pointCountMin: 2,
  pointCountMax: 2,
  styleConfig: {
    point: {
      type: 'square'
    }
  }
};

export const CREATE_CONFIG_POINT1: MarkingItemConfig = {
  pointCountMin: 1,
  pointCountMax: 1
};

export const CREATE_CONFIG_POINT5: MarkingItemConfig = {
  pointCountMax: 5
};

export const CREATE_CONFIG_RECT: MarkingItemConfig = {
  type: 'rect'
};

export const CREATE_CONFIG_RECT2: MarkingItemConfig = {
  type: 'rect2'
};
