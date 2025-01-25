import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useStateDark,
  useStateText,
  useStatePolishedGrayscale,
  useStatePolishedInvert
} from '../../model';

export default function Controls(): ReactElement {
  const [dark, toggleDark] = useStateDark();
  const [text, toggleText] = useStateText();
  const [polishedGrayscale, togglePolishedGrayscale] = useStatePolishedGrayscale();
  const [polishedInvert, togglePolishedInvert] = useStatePolishedInvert();
  
  return <>
    <InputSwitch {...{
      label: dark ? '🌙' : '🌞',
      value: dark,
      onChange: toggleDark
    }} />
    <InputSwitch {...{
      label: '文字',
      value: text,
      onChange: toggleText
    }} />
    <InputSwitch {...{
      label: 'grayscale',
      value: polishedGrayscale,
      onChange: togglePolishedGrayscale
    }} />
    <InputSwitch {...{
      label: 'invert',
      value: polishedInvert,
      onChange: togglePolishedInvert
    }} />
  </>;
}
