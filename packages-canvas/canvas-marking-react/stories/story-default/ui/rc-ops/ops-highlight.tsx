import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useRefImperative
} from '../../model';

export default function OpsHighlight(): ReactElement {
  const ref = useRefImperative();
  
  return <>
    <Button {...{
      onClick: () => ref.current?.highlight('first')
    }}>first</Button>
    <Button {...{
      onClick: () => ref.current?.highlight('last')
    }}>last</Button>
    <Button {...{
      onClick: () => ref.current?.highlight(-1)
    }}>prev</Button>
    <Button {...{
      onClick: () => ref.current?.highlight(1)
    }}>next</Button>
    <Button {...{
      onClick: () => ref.current?.highlight(null)
    }}>none</Button>
    <Button {...{
      onClick: () => ref.current?.highlight(-1, 0)
    }}>prev & border-first</Button>
    <Button {...{
      onClick: () => ref.current?.highlight(1, -1)
    }}>next & border-all</Button>
  </>;
}
