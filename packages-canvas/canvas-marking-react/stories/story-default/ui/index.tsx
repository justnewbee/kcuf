import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import TheCanvas from './rc-canvas';
import TheOps from './rc-ops';

const ScDemoUi = styled.div`
  display: flex;
  gap: 8px;
  height: calc(100vh - 32px);
`;
const ScDomUiMain = styled.div`
  flex: 1;
`;
const ScDomUiSide = styled.aside`
  width: 320px;
`;

export default function DemoUi(): ReactElement {
  return <ScDemoUi>
    <ScDomUiMain>
      <TheCanvas />
    </ScDomUiMain>
    <ScDomUiSide>
      <TheOps />
    </ScDomUiSide>
  </ScDemoUi>;
}
