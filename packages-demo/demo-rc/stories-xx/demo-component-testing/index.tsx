import {
  ReactElement
} from 'react';

import {
  InputSwitch,
  InputSwitchProps,
  ComponentTesting
} from '../../src';
import Shared from '../_shared';

const DEFAULT_PROPS = {
  '/value': true
};

function renderer(props: InputSwitchProps): ReactElement {
  return <InputSwitch {...props} />;
}

export default function DemoComponentTesting(): ReactElement {
  return <>
    <Shared />
    <ComponentTesting<InputSwitchProps> {...{
      componentName: 'InputSwitch',
      componentPackageName: 'demo-rc',
      componentIsDefaultExport: false,
      defaultProps: DEFAULT_PROPS,
      renderer
    }} />
  </>;
}
