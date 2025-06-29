import {
  ReactElement,
  useCallback,
  useState
} from 'react';

import {
  Button,
  PromiseViewer
} from '@kcuf/demo-rc';

import jsonp from '../src';

export default function StoryJsonp(): ReactElement {
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  const handleJsonp = useCallback(() => {
    setStatePromise(jsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp', {
      jsonpCallback: 'jsonp'
    }));
  }, [setStatePromise]);
  
  return <>
    <Button onClick={handleJsonp}>JSONP</Button>
    <PromiseViewer promise={statePromise} />
  </>;
}
