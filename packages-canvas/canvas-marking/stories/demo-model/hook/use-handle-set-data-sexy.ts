import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_GIRL
} from '../const';
import {
  getGirlImageUrl
} from '../util';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataSexy(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.setData(getGirlImageUrl(), DEMO_MARKINGS_GIRL);
  }, [markingStage]);
}
