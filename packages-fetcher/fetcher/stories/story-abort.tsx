import {
  ReactElement,
  useCallback
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import fetcher from '../src';

export default function StoryAbort(): ReactElement {
  const handleJsonp = useCallback(() => {
    fetcher.get('https://apifoxmock.com/m1/4847676-4502957-default/jsonp').then(console.info);
  }, []);
  
  return <Button onClick={handleJsonp}>TODO</Button>;
}
