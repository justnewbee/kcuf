import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useHandleHighlight
} from '../../model';

export default function OpsHighlight(): ReactElement {
  const handleHighlight = useHandleHighlight();
  
  return <>
    <Button {...{
      onClick: () => handleHighlight('first')
    }}>highlight(first)</Button>
    <Button {...{
      onClick: () => handleHighlight('last')
    }}>highlight(last)</Button>
    <Button {...{
      onClick: () => handleHighlight(-1)
    }}>highlight(prev)</Button>
    <Button {...{
      onClick: () => handleHighlight(1)
    }}>highlight(next)</Button>
    <Button {...{
      onClick: () => handleHighlight(-1, 0)
    }}>highlight(prev & border:first)</Button>
    <Button {...{
      onClick: () => handleHighlight(1, -1)
    }}>highlight(next & border:all)</Button>
    <Button {...{
      onClick: () => handleHighlight(null)
    }}>highlight(none)</Button>
  </>;
}
