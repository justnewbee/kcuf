import {
  ReactElement, useState
} from 'react';

import {
  Button,
  InputText
} from '@kcuf/demo-rc';

import {
  useHandleHighlight
} from '../../model';

export default function OpsHighlight(): ReactElement {
  const [stateId, setStateId] = useState('');
  const handleHighlight = useHandleHighlight();
  
  return <>
    <Button {...{
      label: 'highlight(prev)',
      onClick: () => handleHighlight(-1)
    }} />
    <Button {...{
      label: 'highlight(next)',
      onClick: () => handleHighlight(1)
    }} />
    <Button {...{
      label: 'highlight(prev & border:first)',
      onClick: () => handleHighlight(-1, 0)
    }} />
    <Button {...{
      label: 'highlight(next & border:all)',
      onClick: () => handleHighlight(1, -1)
    }} />
    <Button {...{
      label: 'highlight(first)',
      onClick: () => handleHighlight('first')
    }} />
    <Button {...{
      label: 'highlight(last)',
      onClick: () => handleHighlight('last')
    }} />
    <Button {...{
      label: 'highlight(none)',
      onClick: () => handleHighlight(null)
    }} />
    <br />
    <InputText {...{
      value: stateId,
      onChange: setStateId
    }} />
    <Button {...{
      label: 'highlight(id)',
      onClick: () => handleHighlight(stateId)
    }} />
  </>;
}
