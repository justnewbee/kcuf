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
import interceptMerging from '@kcuf/fetcher-interceptor-merging';

const fetcher = createFetcher();

interceptMerging(fetcher);

export default function StoryMerging(): ReactElement {
  const [stateMerging, setStateMerging] = useState<boolean>(true);
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  
  const handleJsonp = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.jsonp({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/jsonp'),
      fetcher.jsonp({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/jsonp')
    ]));
  }, [stateMerging, setStatePromise]);
  const handleGet = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.get({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav'),
      fetcher.get({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav')
    ]));
  }, [stateMerging, setStatePromise]);
  const handlePost = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.post({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_ADD'),
      fetcher.post({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_ADD')
    ]));
  }, [stateMerging, setStatePromise]);
  const handleDelete = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.delete({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_DEL'),
      fetcher.delete({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/artist/fav/ARTIST_ID_DEL')
    ]));
  }, [stateMerging, setStatePromise]);
  const handlePut = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.put({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_UPDATE', {
        name: 'new name'
      }),
      fetcher.put({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_UPDATE', {
        name: 'new name'
      })
    ]));
  }, [stateMerging, setStatePromise]);
  const handlePatch = useCallback(() => {
    setStatePromise(Promise.all([
      fetcher.patch({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_PATCH', {
        name: 'new name'
      }),
      fetcher.patch({
        merging: stateMerging
      }, 'https://apifoxmock.com/m1/4847676-4502957-default/playlist/PLAYLIST_ID_PATCH', {
        name: 'new name'
      })
    ]));
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
