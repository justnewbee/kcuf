import useModelState from './_use-model-state';
import useDispatchSetSeedGray from './use-dispatch-set-seed-gray';

export default function useStateSeedGray(): [string, (value: string) => void] {
  const {
    seedGray
  } = useModelState();
  const dispatchSetSeedGray = useDispatchSetSeedGray();
  
  return [seedGray, dispatchSetSeedGray];
}
