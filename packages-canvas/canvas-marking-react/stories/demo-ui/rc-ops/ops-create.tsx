import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useRefImperative,
  useStats
} from '../../demo-model';

export default function OpsCreate(): ReactElement {
  const ref = useRefImperative();
  const stats = useStats();
  
  return <>
    <Button {...{
      onClick: () => ref.current?.startCreating()
    }}>默认</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating({
        pointCountMax: 5
      })
    }}>最多 5 点</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating({
        type: 'rect'
      })
    }}>矩形</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating({
        type: 'rect2'
      })
    }}>矩形 II</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating({
        pointStyle: {
          type: 'square'
        },
        pointCountMin: 2,
        pointCountMax: 2
      })
    }}>线</Button>
    <Button {...{
      disabled: !stats?.creating,
      onClick: () => ref.current?.cancelCreating()
    }}>取消</Button>
  </>;
}
