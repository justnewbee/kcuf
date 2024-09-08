import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useMarkingStage
} from '../../demo-model';

import OpsOverall from './ops-overall';
import OpsImageData from './ops-image-data';
import OpsMarkings from './ops-markings';
import OpsSelect from './ops-select';
import OpsHighlight from './ops-highlight';
import OpsZoom from './ops-zoom';

const ScActions = styled.div`
  margin-top: 8px;
`;

export default function Ops(): ReactElement {
  const markingStage = useMarkingStage();
  
  return <ScActions>
    <OpsOverall />
    {markingStage ? <>
      <OpsImageData />
      <OpsMarkings />
      <OpsSelect />
      <OpsHighlight />
      <OpsZoom />
    </> : null}
  </ScActions>;
}