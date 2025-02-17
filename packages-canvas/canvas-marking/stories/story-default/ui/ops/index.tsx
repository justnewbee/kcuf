import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  Form
} from '@kcuf/demo-rc';

import {
  useMarkingInstance
} from '../../model';

import OpsOverall from './ops-overall';
import OpsOptions from './ops-options';
import OpsPlugins from './ops-plugins';
import OpsImageData from './ops-image-data';
import OpsMarkings from './ops-markings';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoomMove from './ops-zoom-move';

const ScForm = styled(Form)`
  margin-left: 12px;
  width: 360px;
`;

export default function Ops(): ReactElement {
  const markingInstance = useMarkingInstance();
  
  return <ScForm {...{
    dense: true,
    items: [{
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
