import {
  ReactElement
} from 'react';

import {
  Table,
  TableColumnProps
} from '../../../src';

interface IData {
  id: string;
  name: string;
}

const columns: TableColumnProps<IData>[] = [{
  title: 'ID',
  dataIndex: 'id',
  width: '25%'
}, {
  title: '名称',
  dataIndex: 'name'
}, {
  title: '操作',
  align: 'right',
  renderCell(): ReactElement {
    return <span>操作 Placeholder</span>;
  }
}];

const datasource: IData[] = [{
  id: 'ID-1',
  name: '名称 - 1'
}, {
  id: 'ID-2',
  name: '名称 - 2'
}];

export default function DemoTable(): ReactElement {
  return <Table<IData> {...{
    datasource,
    columns
  }} />;
}
