import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useRefImperative
} from '../../model';

export default function OpsSelect(): ReactElement {
  const ref = useRefImperative();
  
  return <>
    <Button {...{
      onClick: () => ref.current?.select('first')
    }}>first</Button>
    <Button {...{
      onClick: () => ref.current?.select('last')
    }}>last</Button>
    <Button {...{
      onClick: () => ref.current?.select(-1)
    }}>prev</Button>
    <Button {...{
      onClick: () => ref.current?.select(1)
    }}>next</Button>
    <Button {...{
      onClick: () => ref.current?.select(null)
    }}>none</Button>
  </>;
}
