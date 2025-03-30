import {
  ReactElement,
  useCallback
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import fetch from '../src';

export default function StoryFetch(): ReactElement {
  const handleJsonp = useCallback(() => {
    fetch('https://apifoxmock.com/m1/4847676-4502957-default/jsonp');
  }, []);
  
  return <Button onClick={handleJsonp}>fetchJsonp</Button>;
}
