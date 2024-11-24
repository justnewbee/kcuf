import {
  ReactElement
} from 'react';

import {
  Form
} from '@kcuf/demo-rc';

import OpsDisabled from './ops-disabled';
import OpsDestroyed from './ops-destroyed';
import OpsPlugins from './ops-plugins';
import OpsCreate from './ops-create';
import OpsDataType from './ops-data-type';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoomMove from './ops-zoom-move';
import OpsDebug from './ops-debug';

export default function Ops(): ReactElement {
  return <Form {...{
    dense: true,
    items: [{
      label: 'Disabled',
      content: <OpsDisabled />
    }, {
      label: 'Create',
      content: <OpsCreate />
    }, {
      label: 'Select',
      content: <OpsSelect />
    }, {
      label: 'Highlight',
      content: <OpsHighlight />
    }, {
      label: 'Zoom / Move',
      content: <OpsZoomMove />
    }, {
      label: '数据源',
      content: <OpsDataType />
    }, {
      label: 'Debug',
      content: <OpsDebug />
    }, {
      label: '插件',
      content: <OpsPlugins />
    }, {
      label: '卸载组件',
      content: <OpsDestroyed />
    }]
  }} />;
}
