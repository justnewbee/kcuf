import {
  ReactElement,
  useCallback
} from 'react';

import fetch from '../src';

import {
  Button
} from '@kcuf/demo-rc';

export default function StoryFetch(): ReactElement {
  const handleJsonp = useCallback(() => {
    fetch('https://apifoxmock.com/m1/4847676-4502957-default/jsonp').then(console.info)
  }, []);
  
  return <Button onClick={handleJsonp}>fuck you </Button>;
}