import {
  ReactElement
} from 'react';

import Model, {
  CanvasMarkingProps
} from './model';
import Ui from './ui';

export default function CanvasMarking<T = unknown>(props: CanvasMarkingProps<T>): ReactElement {
  return <Model {...props}>
    <Ui />
  </Model>;
}
