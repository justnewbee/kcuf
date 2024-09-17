import {
  ReactElement,
  useState,
  useCallback
} from 'react';
import {
  Button,
  PromiseViewer
} from '@kcuf/demo-rc';

import fetcher from '../src';

export default function StoryMethods(): ReactElement {
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  
  const handleJsonp = useCallback(() => {
    setStatePromise(fetcher.jsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp'));
  }, [setStatePromise]);
  const handleGet = useCallback(() => {
    setStatePromise(fetcher.get('https://apifoxmock.com/m1/4847676-4502957-default/artist/fav'));
  }, [setStatePromise]);
  const handlePost = useCallback(() => {
    setStatePromise(fetcher.post('https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_ADD'));
  }, [setStatePromise]);
  const handleDelete = useCallback(() => {
    setStatePromise(fetcher.delete('https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_DEL'));
  }, [setStatePromise]);
  const handlePut = useCallback(() => {
    setStatePromise(fetcher.put('https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_UPDATE', {
      name: 'new name'
    }));
  }, [setStatePromise]);
  const handlePatch = useCallback(() => {
    setStatePromise(fetcher.patch('https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_PATCH', {
      name: 'new name'
    }));
  }, [setStatePromise]);
  
  return <>
    <Button onClick={handleJsonp}>jsonp</Button>
    <Button onClick={handleGet}>get</Button>
    <Button onClick={handlePost}>post</Button>
    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={handlePut}>put</Button>
    <Button onClick={handlePatch}>patch</Button>
    <PromiseViewer promise={statePromise} />
  </>;
}