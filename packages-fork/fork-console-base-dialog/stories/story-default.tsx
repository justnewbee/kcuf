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

export default function DemoDefault(): ReactElement {
  const [stateYes, setStateYes] = useState<boolean>(false);
  
  return <>
    <H1>基础用法</H1>
    <Button {...{
      onClick: () => setStateYes(true)
    }}>as component</Button>
    <Button {...{
      onClick: () => open({})
    }}>as promise</Button>
    {stateYes ? <Dialog {...{
      onClose() {
        setStateYes(false);
      }
    }} /> : null}
    <H1>快速方法 I：<code>open</code>、<code>slide</code>、<code>slideUp</code></H1>
    <Button {...{
      onClick: () => open({}).then(console.info)
    }}>open</Button>
    <Button {...{
      onClick: () => slide({}).then(console.info)
    }}>slide</Button>
    <Button {...{
      onClick: () => slideUp({}).then(console.info)
    }}>slideUp</Button>
    <Hr />
    <H1>快速方法 II：<code>alert</code>、<code>confirm</code>、<code>prompt</code></H1>
    <Button {...{
      onClick: () => alert('Alert').then(console.info)
    }}>alert</Button>
    <Button {...{
      onClick: () => confirm('Confirm').then(console.info)
    }}>confirm</Button>
  </>;
}
