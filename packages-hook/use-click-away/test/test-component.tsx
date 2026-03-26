import {
  ReactElement
} from 'react';

import useClickAway from '../src';

interface ITargetProps {
  handler(): void;
}

export default function TestComponent(props: ITargetProps): ReactElement {
  const ref = useClickAway(props.handler);
  
  return <div data-testid="target" ref={ref} />;
}
