import {
  ReactElement
} from 'react';

import Alert, {
  AlertType
} from '../src';

const TYPES = [
  AlertType.HELP,
  AlertType.INFO,
  AlertType.SUCCESS,
  AlertType.WARNING,
  AlertType.ERROR
];

export default function StoryAll(): ReactElement {
  return <>
    {TYPES.map(v => <Alert key={v}>{v}</Alert>)}
  </>;
}
