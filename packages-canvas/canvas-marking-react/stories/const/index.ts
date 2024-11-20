import {
  DatasourceItem
} from '@kcuf/demo-rc';

import {
  EImageType
} from '../enum';

export const DATASOURCE_IMAGE: DatasourceItem<EImageType>[] = [{
  value: EImageType.ARIAL,
  label: '航拍图'
}, {
  value: EImageType.RANDOM,
  label: '随机图'
}, {
  value: EImageType.NO_IMAGE,
  label: '无图'
}, {
  value: EImageType.NONE,
  label: '空'
}];

export { default as MARKING_ITEMS_AERIAL } from './marking-items-aerial';
export { default as MARKING_ITEMS_RANDOM } from './marking-items-random';
export { default as MARKING_ITEMS_NO_IMAGE } from './marking-items-no-image';
