import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useFloatingVisible
} from '../../demo-model';

const ScFloating = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: hsl(0 0% 0% / 70%);
  color: hsl(0 0% 100%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  text-align: center;
  align-content: center;
`;

export default function Floating(): ReactElement | null {
  const floatingVisible = useFloatingVisible();
  
  return floatingVisible ? <ScFloating>Floating</ScFloating> : null;
}