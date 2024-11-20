import useEffectInit from './use-effect-init';
import useEffectDestroy from './use-effect-destroy';
import useEffectSetData from './use-effect-set-data';
import useEffectDisable from './use-effect-disable';

export default function useEffects(): void {
  useEffectInit();
  useEffectDestroy();
  useEffectSetData();
  useEffectDisable();
}
