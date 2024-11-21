import {
  DatasourceItem
} from '@kcuf/demo-rc';

import {
  DataType
} from '../../demo-model';

export const DATASOURCE_IMAGE: DatasourceItem<DataType>[] = [{
  value: DataType.ARIAL,
  label: '航拍图'
}, {
  value: DataType.RANDOM,
  label: '随机图'
}, {
  value: DataType.NO_IMAGE,
  label: '无图'
}, {
  value: DataType.NONE,
  label: '空'
}];
