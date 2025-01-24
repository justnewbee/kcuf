import {
  ReactElement
} from 'react';

import {
  Form,
  InputSwitch,
  InputRange
} from '@kcuf/demo-rc';

import {
  useStateDark,
  useStateSaturation,
  useStateHueOffset
} from '../../model';

export default function Controls(): ReactElement {
  const [dark, setDark] = useStateDark();
  const [saturation, setSaturation] = useStateSaturation();
  const [hueOffset, setHueOffset] = useStateHueOffset();
  
  return <Form {...{
    items: [{
      label: '暗色',
      content: <InputSwitch {...{
        value: dark,
        onChange: setDark
      }} />
    }, {
      label: 'Hue Offset 0-9',
      content: <InputRange {...{
        min: 0,
        max: 9,
        value: hueOffset,
        onChange: setHueOffset
      }} />
    }, {
      label: 'Saturation 0-100',
      content: <InputRange {...{
        min: 0,
        max: 100,
        value: saturation,
        onChange: setSaturation
      }} />
    }]
  }} />;
}
