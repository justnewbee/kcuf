import {
  ReactElement,
  useState,
  useCallback
} from 'react';
import {
  Button,
  PromiseViewer,
  InputSwitch
} from '@kcuf/demo-rc';
import {
  createFetcher
} from '@kcuf/fetcher';

import intercept from '../src';

const fetcher = createFetcher();

intercept(fetcher);

export default function StoryMethods(): ReactElement {
  const [stateMerging, setStateMerging] = useState<boolean>(false);
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  
  const handleJsonp = useCallback(() => {
    setStatePromise(fetcher.jsonp({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/jsonp'));
  }, [stateMerging, setStatePromise]);
  const handleGet = useCallback(() => {
    setStatePromise(fetcher.get({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav'));
  }, [stateMerging, setStatePromise]);
  const handlePost = useCallback(() => {
    setStatePromise(fetcher.post({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_ADD'));
  }, [stateMerging, setStatePromise]);
  const handleDelete = useCallback(() => {
    setStatePromise(fetcher.delete({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_DEL'));
  }, [stateMerging, setStatePromise]);
  const handlePut = useCallback(() => {
    setStatePromise(fetcher.put({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_UPDATE', {
      name: 'new name'
    }));
  }, [stateMerging, setStatePromise]);
  const handlePatch = useCallback(() => {
    setStatePromise(fetcher.patch({
      merging: stateMerging
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_PATCH', {
      name: 'new name'
    }));
  }, [stateMerging, setStatePromise]);
  
  return <>
    <div>
      <InputSwitch {...{
        label: 'merging',
        value: stateMerging,
        onChange: setStateMerging
      }} />
    </div>
    <Button onClick={handleJsonp}>jsonp</Button>
    <Button onClick={handleGet}>get</Button>
    <Button onClick={handlePost}>post</Button>
    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={handlePut}>put</Button>
    <Button onClick={handlePatch}>patch</Button>
    <PromiseViewer promise={statePromise} />
  </>;
}