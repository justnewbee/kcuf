import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useZIndex,
  useHandleClick
} from '@kcuf-ui/rc-backdrop-headless';

const ScBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: hsla(0 0% 0% / 17%);
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
