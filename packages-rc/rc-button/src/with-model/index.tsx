import {
  ReactElement,
  Ref,
  forwardRef
} from 'react';

import Model, {
  IModelProps
} from '../model';
import Ui from '../ui';

function WithProvider(props: IModelProps, ref: Ref<HTMLDivElement>): ReactElement {
  return <Model props={props}>
    <Ui ref={ref} />
  </Model>;
}

export default forwardRef(WithProvider);
