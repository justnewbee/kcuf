import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useStateDark,
  useStateText,
  useStateGrayscale,
  useStateInvert
} from '../../model';

export default function Controls(): ReactElement {
  const [dark, toggleDark] = useStateDark();
  const [text, toggleText] = useStateText();
  const [grayscale, toggleGrayscale] = useStateGrayscale();
  const [invert, toggleInvert] = useStateInvert();
  
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
      value: grayscale,
      onChange: toggleGrayscale
    }} />
    <InputSwitch {...{
      label: 'invert',
      value: invert,
      onChange: toggleInvert
    }} /></>;
}
