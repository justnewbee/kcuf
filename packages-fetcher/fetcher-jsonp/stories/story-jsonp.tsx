import {
  ReactElement,
  useCallback
} from 'react';

import jsonp from '../src';

import {
  Button
} from '@kcuf/demo-rc';

export default function StoryJsonp(): ReactElement {
  const handleJsonp = useCallback(() => {
    jsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp').then(console.info)
  }, []);
  
  return <Button onClick={handleJsonp}>fuck you </Button>;
}