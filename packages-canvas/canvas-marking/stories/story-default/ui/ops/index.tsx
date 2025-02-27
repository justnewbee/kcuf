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
import OpsPlugins from './ops-plugins';
import OpsImageData from './ops-image-data';
import OpsCreate from './ops-create';
import OpsDelete from './ops-delete';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoomMove from './ops-zoom-move';
import OpsOptions from './ops-options';

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
      label: '插件',
      content: <OpsPlugins />
    }, ...markingInstance ? [{
      label: '数据',
      content: <OpsImageData />
    }, {
      label: 'Create',
      content: <OpsCreate />
    }, {
      label: 'Delete',
      content: <OpsDelete />
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
      label: 'Options',
      content: <OpsOptions />
    }] : []]
  }} />;
}
