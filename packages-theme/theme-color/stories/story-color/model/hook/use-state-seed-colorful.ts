import useModelState from './_use-model-state';
import useDispatchSetSeedColorful from './use-dispatch-set-seed-colorful';

export default function useStateSeedColorful(): [string, (value: string) => void] {
  const {
    seedColorful
  } = useModelState();
  const dispatchSetSeedColorful = useDispatchSetSeedColorful();
  
  return [seedColorful, dispatchSetSeedColorful];
}
