import {
  ReactElement,
  useCallback
} from 'react';

import fetcher from '../src';

import {
  Button
} from '@kcuf/demo-rc';

export default function StoryMethods(): ReactElement {
  const handleJsonp = useCallback(() => {
    fetcher.get('https://apifoxmock.com/m1/4847676-4502957-default/jsonp').then(console.info)
  }, []);
  
  return <Button onClick={handleJsonp}>TODO</Button>;
}