import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_GIRL
} from '../const';
import {
  getGirlImageUrl
} from '../util';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSetDataSexy(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.setData(getGirlImageUrl(), DEMO_MARKINGS_GIRL);
  }, [markingInstance]);
}
