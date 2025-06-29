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
      label: 'select(prev)',
      onClick: () => handleSelect(-1)
    }} />
    <Button {...{
      label: 'select(next)',
      onClick: () => handleSelect(1)
    }} />
    <Button {...{
      label: 'select(first)',
      onClick: () => handleSelect('first')
    }} />
    <Button {...{
      label: 'select(last)',
      onClick: () => handleSelect('last')
    }} />
    <Button {...{
      label: 'select(none)',
      onClick: () => handleSelect(null)
    }} />
    <br />
    <InputText {...{
      value: stateId,
      onChange: setStateId
    }} />
    <Button {...{
      label: 'select(id)',
      onClick: () => handleSelect(stateId)
    }} />
  </>;
}
