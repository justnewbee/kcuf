import {
  ReactElement,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  Transition
} from '../src';

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

export default function StoryTransition(): ReactElement {
  const [stateIn, setStateIn] = useState(false);
  
  const nodeRef = useRef<HTMLDivElement | null>(null);
  
  return <>
    <InputSwitch {...{
      label: 'in',
      value: stateIn,
      onChange: setStateIn
    }} />
    <Transition {...{
      nodeRef,
      in: stateIn,
      duration,
      appear: true,
      enter: false,
      mountOnEnter: true
    }}>
      {status => {
        console.info(status);
        
        return <ScFade ref={nodeRef} style={transitionStyles[status]}>
          I am a fade Transition!
        </ScFade>;
      }}
    </Transition>
  </>;
}
