import {
  ReactElement,
  useState
} from 'react';

import {
  H1,
  Button,
  Hr
} from '@kcuf/demo-rc';

import Dialog, {
  open,
  slide,
  slideUp,
  alert,
  confirm
} from '../src';

export default function StoryDefault(): ReactElement {
  const [stateYes, setStateYes] = useState<boolean>(false);
  
  return <>
    <H1>基础用法</H1>
    <Button {...{
      label: 'as component',
      onClick: () => setStateYes(true)
    }} />
    <Button {...{
      label: 'as promise',
      onClick: () => open({})
    }} />
    {stateYes ? <Dialog {...{
      onClose() {
        setStateYes(false);
      }
    }} /> : null}
    <H1>快速方法 I：<code>open</code>、<code>slide</code>、<code>slideUp</code></H1>
    <Button {...{
      label: 'open',
      onClick: () => open({}).then(console.info) // eslint-disable-line no-console
    }} />
    <Button {...{
      label: 'slide',
      onClick: () => slide({}).then(console.info) // eslint-disable-line no-console
    }} />
    <Button {...{
      label: 'slideUp',
      onClick: () => slideUp({}).then(console.info) // eslint-disable-line no-console
    }} />
    <Hr />
    <H1>快速方法 II：<code>alert</code>、<code>confirm</code>、<code>prompt</code></H1>
    <Button {...{
      label: 'alert',
      onClick: () => alert('Alert').then(console.info) // eslint-disable-line no-console
    }} />
    <Button {...{
      label: 'confirm',
      onClick: () => confirm('Confirm').then(console.info) // eslint-disable-line no-console
    }} />
  </>;
}
