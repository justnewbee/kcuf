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
import OpsImageData from './ops-image-data';
import OpsPlugin from './ops-plugin';
import OpsMarkings from './ops-markings';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoom from './ops-zoom';

export default function Ops(): ReactElement {
  const markingInstance = useMarkingInstance();
  
  return <Form {...{
    dense: true,
    items: [{
      label: ' ',
      content: <OpsOverall />
    }, ...markingInstance ? [{
      label: '数据',
      content: <OpsImageData />
    }, {
      label: '插件',
      content: <OpsPlugin />
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
      label: 'Zoom',
      content: <OpsZoom />
    }] : []]
  }} />;
}
