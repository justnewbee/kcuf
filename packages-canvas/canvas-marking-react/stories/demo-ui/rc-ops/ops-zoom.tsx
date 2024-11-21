import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';
import {
  ZoomHow
} from '@kcuf/canvas-marking-react-headless';

import {
  useRefImperative
} from '../../demo-model';

export default function OpsZoom(): ReactElement {
  const ref = useRefImperative();
  
  return <>
    <Button {...{
      onClick: () => ref.current?.zoom(ZoomHow.IN)
    }}>zoom +</Button>
    <Button {...{
      onClick: () => ref.current?.zoom(ZoomHow.OUT)
    }}>zoom -</Button>
    <Button {...{
      onClick: () => ref.current?.zoom(ZoomHow.MIN)
    }}>zoom min</Button>
    <Button {...{
      onClick: () => ref.current?.zoom(ZoomHow.MAX)
    }}>zoom MAX</Button>
    <Button {...{
      onClick: () => ref.current?.zoom(ZoomHow.RESET)
    }}>zoom Reset</Button>
  </>;
}
