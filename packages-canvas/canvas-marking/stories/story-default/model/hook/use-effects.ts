import useEffectInit from './use-effect-init';
import useEffectUpdateOptions from './use-effect-update-options';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectUpdateOptions();
  useEffectDestroy();
}
