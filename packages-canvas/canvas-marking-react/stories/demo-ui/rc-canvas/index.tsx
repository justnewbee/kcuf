import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import CanvasMarking from '../../../src';
import {
  useRefImperative,
  useDataImage,
  useDataMarkings,
  useDisabled,
  usePlugins,
  useHandleSetStats,
  useDestroyed
} from '../../demo-model';
import {
  getHoveringInfo
} from '../util';

const ScCanvasMarking = styled(CanvasMarking)`
  min-height: 800px;
  resize: vertical;
`;

export default function TheCanvas(): ReactElement | null {
  const ref = useRefImperative();
  const disabled = useDisabled();
  const destroyed = useDestroyed();
  const image = useDataImage();
  const markings = useDataMarkings();
  const plugins = usePlugins();
  const handleSetStats = useHandleSetStats();
  
  return destroyed ? null : <ScCanvasMarking {...{
    ref,
    image,
    markings,
    plugins,
    disabled,
    tooltipOptions: {
      getHoveringInfo
    },
    onStatsChange: handleSetStats
  }} />;
}
