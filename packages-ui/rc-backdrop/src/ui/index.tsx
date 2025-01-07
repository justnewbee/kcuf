import {
  ReactElement,
  useRef
} from 'react';
import styled from 'styled-components';

import Transition from '@kcuf-ui/rc-transition';
import {
  useZIndex,
  useHandleClick
} from '@kcuf-ui/rc-backdrop-headless';

const ScBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: hsla(0 0% 0% / 17%);
  transition: all 300ms ease-in-out;
  
  &[data-transition='entering'] {
    opacity: 1;
  }
  
  &[data-transition='entered'] {
    opacity: 1;
  }
  
  &[data-transition='exiting'] {
    opacity: 0;
  }
  
  &[data-transition='exited'] {
    opacity: 0;
  }
`;

export default function Ui(): ReactElement | null {
  const zIndex = useZIndex();
  const handleClick = useHandleClick();
  const nodeRef = useRef<HTMLDivElement | null>(null);
  
  return <Transition {...{
    nodeRef,
    in: zIndex > 0
  }}>
    <ScBackdrop {...{
      ref: nodeRef,
      style: {
        zIndex
      },
      onClick: handleClick
    }} />
  </Transition>;
}
