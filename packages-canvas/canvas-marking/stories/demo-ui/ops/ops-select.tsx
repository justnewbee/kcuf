import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useHandleSelect
} from '../../demo-model';

export default function OpsSelect(): ReactElement {
  const handleSelect = useHandleSelect();
  
  return <div>
    <Button {...{
      onClick: () => handleSelect('first')
    }}>select(first)</Button>
    <Button {...{
      onClick: () => handleSelect('last')
    }}>select(last)</Button>
    <Button {...{
      onClick: () => handleSelect(-1)
    }}>select(prev)</Button>
    <Button {...{
      onClick: () => handleSelect(1)
    }}>select(next)</Button>
    <Button {...{
      onClick: () => handleSelect(null)
    }}>select(none)</Button>
  </div>;
}