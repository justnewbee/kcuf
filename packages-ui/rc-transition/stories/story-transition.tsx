import {
  ReactElement,
  Ref,
  forwardRef,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import Transition, {
  useTransitionStatus
} from '../src';

const duration = 300;

const ScFade = styled.div`
  margin: 8px;
  padding: 12px;
  opacity: 0;
  background-color: hsl(228 85% 90%);
  color: hsl(0 0% 45%);
  transition: opacity ${duration}ms ease-in-out;
`;

const ScChild = styled(ScFade)`
  &[data-transition='entering'] {
    opacity: 1;
  }
  
  &[data-transition='entered'] {
    opacity: 1;
  }
  
  &[data-transition='exiting'] {
    opacity: 0;
    text-decoration: line-through;
  }
  
  &[data-transition='exited'] {
    opacity: 0;
  }
`;

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

// eslint-disable-next-line react/display-name
const HookChild = forwardRef((_props: unknown, ref: Ref<HTMLDivElement>): ReactElement => {
  const transitionStatus = useTransitionStatus();
  
  return <ScFade ref={ref} style={transitionStyles[transitionStatus]}>
    I use hook useTransitionStatus.
  </ScFade>;
});

export default function StoryTransitionClone(): ReactElement {
  const [stateIn, setStateIn] = useState(false);
  
  const nodeRef1 = useRef<HTMLDivElement | null>(null);
  const nodeRef2 = useRef<HTMLDivElement | null>(null);
  const nodeRef3 = useRef<HTMLDivElement | null>(null);
  
  return <>
    <InputSwitch {...{
      label: 'in',
      value: stateIn,
      onChange: setStateIn
    }} />
    <Transition {...{
      nodeRef: nodeRef1,
      in: stateIn,
      mountOnEnter: true,
      unmountOnExit: true
    }}>
      <ScChild ref={nodeRef1}>I use data-transition as CSS hook.</ScChild>
    </Transition>
    <Transition {...{
      nodeRef: nodeRef2,
      in: stateIn,
      mountOnEnter: true,
      unmountOnExit: true
    }}>
      {status => <ScFade ref={nodeRef2} style={transitionStyles[status]}>
        I use render function as child.
      </ScFade>}
    </Transition>
    <Transition {...{
      nodeRef: nodeRef3,
      in: stateIn,
      mountOnEnter: true,
      unmountOnExit: true
    }}>
      <HookChild ref={nodeRef3} />
    </Transition>
  </>;
}
