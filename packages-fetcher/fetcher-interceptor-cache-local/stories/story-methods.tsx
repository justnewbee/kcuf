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
  const [stateCacheLocal, setStateCacheLocal] = useState<boolean>(false);
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  
  const handleJsonp = useCallback(() => {
    setStatePromise(fetcher.jsonp({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/jsonp'));
  }, [stateCacheLocal, setStatePromise]);
  const handleGet = useCallback(() => {
    setStatePromise(fetcher.get({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav'));
  }, [stateCacheLocal, setStatePromise]);
  const handlePost = useCallback(() => {
    setStatePromise(fetcher.post({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_ADD'));
  }, [stateCacheLocal, setStatePromise]);
  const handleDelete = useCallback(() => {
    setStatePromise(fetcher.delete({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_DEL'));
  }, [stateCacheLocal, setStatePromise]);
  const handlePut = useCallback(() => {
    setStatePromise(fetcher.put({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_UPDATE', {
      name: 'new name'
    }));
  }, [stateCacheLocal, setStatePromise]);
  const handlePatch = useCallback(() => {
    setStatePromise(fetcher.patch({
      cacheLocal: stateCacheLocal
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_PATCH', {
      name: 'new name'
    }));
  }, [stateCacheLocal, setStatePromise]);
  
  return <>
    <div>
      <InputSwitch {...{
        label: 'cacheLocal',
        value: stateCacheLocal,
        onChange: setStateCacheLocal
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