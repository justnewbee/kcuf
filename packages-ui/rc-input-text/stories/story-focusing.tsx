import {
  ReactElement,
  useRef
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import InputText, {
  InputTextRef
} from '../src';

export default function StoryFocusing(): ReactElement {
  const inputTextRef = useRef<InputTextRef>(null);
  
  return <>
    <div>
      <Button {...{
        label: 'focus',
        onClick: () => inputTextRef.current?.focus()
      }} />
      <Button {...{
        label: 'focus - cursor first',
        onClick: () => inputTextRef.current?.focus({
          cursor: 'start'
        })
      }} />
      <Button {...{
        label: 'focus - cursor last',
        onClick: () => inputTextRef.current?.focus({
          cursor: 'end'
        })
      }} />
      <Button {...{
        label: 'focus - prevent scroll',
        onClick: () => inputTextRef.current?.focus({
          preventScroll: true
        })
      }} />
      <Button {...{
        label: 'select',
        onClick: () => inputTextRef.current?.select()
      }} />
      <Button {...{
        label: 'selectText',
        onClick: () => inputTextRef.current?.selectText(1, 4)
      }} /></div>
    <InputText defaultValue="Kcuf InputText rules" ref={inputTextRef} /></>;
}
