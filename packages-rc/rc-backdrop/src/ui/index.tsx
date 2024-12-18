import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useZIndex,
  useHandleClick
} from '@kcuf/rc-headless-backdrop';

const ScBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: hsla(0 0% 0% / 17%);
  backdrop-filter: blur(7px);
`;

export default function Ui(): ReactElement | null {
  const zIndex = useZIndex();
  const handleClick = useHandleClick();
  
  return zIndex > 0 ? <ScBackdrop {...{
    style: {
      zIndex
    },
    onClick: handleClick
  }} /> : null;
}
