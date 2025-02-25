import {
  ReactElement,
  useState
} from 'react';

import {
  Button,
  InputText
} from '@kcuf/demo-rc';

import {
  useHandleSelect
} from '../../model';

export default function OpsSelect(): ReactElement {
  const [stateId, setStateId] = useState('');
  const handleSelect = useHandleSelect();
  
  return <>
    <Button {...{
      onClick: () => handleSelect(-1)
    }}>select(prev)</Button>
    <Button {...{
      onClick: () => handleSelect(1)
    }}>select(next)</Button>
    <Button {...{
      onClick: () => handleSelect('first')
    }}>select(first)</Button>
    <Button {...{
      onClick: () => handleSelect('last')
    }}>select(last)</Button>
    <Button {...{
      onClick: () => handleSelect(null)
    }}>select(none)</Button>
    <br />
    <InputText {...{
      value: stateId,
      onChange: setStateId
    }} />
    <Button {...{
      onClick: () => handleSelect(stateId)
    }}>select(id)</Button>
  </>;
}
