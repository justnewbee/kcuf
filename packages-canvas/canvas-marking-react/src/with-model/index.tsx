import {
  ReactElement
} from 'react';

import Model, {
  CanvasMarkingProps
} from '../model';
import Ui from '../ui';

export default function WithModel(props: CanvasMarkingProps): ReactElement {
  return <Model {...props}>
    <Ui />
  </Model>;
}
