import {
  DatasourceItem
} from '@kcuf/demo-rc';

import {
  EDataType
} from '../enum';

export const DATASOURCE_DATA_TYPE: DatasourceItem<EDataType>[] = [{
  value: EDataType.ARIAL,
  label: '航拍图'
}, {
  value: EDataType.RANDOM,
  label: '随机图'
}, {
  value: EDataType.NO_IMAGE,
  label: '无图'
}, {
  value: EDataType.NONE,
  label: '空'
}];

export { default as MARKING_ITEMS_AERIAL } from './marking-items-aerial';
export { default as MARKING_ITEMS_RANDOM } from './marking-items-random';
export { default as MARKING_ITEMS_NO_IMAGE } from './marking-items-no-image';
