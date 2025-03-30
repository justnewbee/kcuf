import {
  ReactElement,
  useCallback
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import fetch from '../src';

export default function StoryFetchSse(): ReactElement {
  const handleTest = useCallback(() => {
    fetch('https://apifoxmock.com/m1/4847676-4502957-default/jsonp');
  }, []);
  
  return <Button onClick={handleTest}>fetchSse</Button>;
}
