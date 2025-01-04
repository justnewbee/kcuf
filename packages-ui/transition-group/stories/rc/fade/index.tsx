import {
  ReactElement,
  useRef
} from 'react';
import styled from 'styled-components';

import {
  Transition
} from '../../../src';

interface IProps {
  in?: boolean;
}

const duration = 300;

const transitionStyles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
};

const ScFade = styled.div`
  padding: 12px;
  opacity: 0;
  background-color: hsl(71 100% 50%);
  transition: opacity ${duration}ms ease-in-out;
`;

export default function Fade({
  in: inProp
}: IProps): ReactElement {
  const nodeRef = useRef(null);
  
  return <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
    {state => <ScFade ref={nodeRef} style={transitionStyles[state]}>
      I a fade Transition!
    </ScFade>}
  </Transition>;
}
