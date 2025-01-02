import {
  ReactElement
} from 'react';

import {
  Form
} from '@kcuf/demo-rc';

import {
  useMarkingInstance
} from '../../demo-model';

import OpsOverall from './ops-overall';
import OpsOptions from './ops-options';
import OpsPlugins from './ops-plugins';
import OpsImageData from './ops-image-data';
import OpsMarkings from './ops-markings';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoomMove from './ops-zoom-move';

export default function Ops(): ReactElement {
  const markingInstance = useMarkingInstance();
  
  return <Form {...{
    dense: true,
    items: [{
      label: ' ',
      content: <OpsOverall />
    }, {
      label: 'Options',
      content: <OpsOptions />
    }, {
      label: '插件',
      content: <OpsPlugins />
    }, ...markingInstance ? [{
      label: '数据',
      content: <OpsImageData />
    }, {
      label: 'Markings',
      content: <OpsMarkings />
    }, {
      label: 'Select',
      content: <OpsSelect />
    }, {
      label: 'Highlight',
      content: <OpsHighlight />
    }, {
      label: 'Zoom / Move',
      content: <OpsZoomMove />
    }] : []]
  }} />;
}
