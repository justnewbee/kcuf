import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useStateDark,
  useStateText,
  useStateGrayscale
} from '../../model';

export default function Toggles(): ReactElement {
  const [dark, toggleDark] = useStateDark();
  const [text, toggleText] = useStateText();
  const [grayscale, toggleGrayscale] = useStateGrayscale();
  
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
      label: 'Grayscale',
      value: grayscale,
      onChange: toggleGrayscale
    }} />
  </>;
}
