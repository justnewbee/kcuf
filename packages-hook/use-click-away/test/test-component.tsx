import {
  ReactElement
} from 'react';

import useClickAway from '../src';

interface ITargetProps {
  handler(): void;
  ignore?: string;
}

export default function TestComponent(props: ITargetProps): ReactElement {
  const ref = useClickAway(props.handler, props.ignore);
  
  return <div data-testid="target" ref={ref} />;
}
