import {
  ReactElement,
  useRef
} from 'react';

import {
  Transition
} from '../../../src';

interface IProps {
  in?: boolean;
}

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

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

export default function Fade({
  in: inProp
}: IProps): ReactElement {
  const nodeRef = useRef(null);
  
  return <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
    {state => <div ref={nodeRef} style={{
      ...defaultStyle,
      ...transitionStyles[state]
    }}>
      I a fade Transition!
    </div>}
  </Transition>;
}
