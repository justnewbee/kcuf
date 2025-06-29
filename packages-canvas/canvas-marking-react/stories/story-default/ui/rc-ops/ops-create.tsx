import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useRefImperative,
  useMarkingStats
} from '../../model';
import {
  CREATE_CONFIG_LINE,
  CREATE_CONFIG_POINT1,
  CREATE_CONFIG_POINT5,
  CREATE_CONFIG_RECT,
  CREATE_CONFIG_RECT2
} from '../const';

export default function OpsCreate(): ReactElement {
  const ref = useRefImperative();
  const stats = useMarkingStats();
  
  return <>
    <Button {...{
      onClick: () => ref.current?.startCreating()
    }}>默认</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating(CREATE_CONFIG_POINT1)
    }}>单点</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating(CREATE_CONFIG_POINT5)
    }}>最多 5 点</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating(CREATE_CONFIG_RECT)
    }}>矩形</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating(CREATE_CONFIG_RECT2)
    }}>矩形 II</Button>
    <Button {...{
      onClick: () => ref.current?.startCreating(CREATE_CONFIG_LINE)
    }}>线</Button>
    <Button {...{
      disabled: !stats?.creating,
      onClick: () => ref.current?.cancelCreating()
    }}>取消</Button></>;
}
