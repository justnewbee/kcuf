import useEffectInit from './use-effect-init';
import useEffectReadOnly from './use-effect-read-only';
import useEffectSyncControllableValue from './use-effect-sync-controllable-value';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectReadOnly();
  useEffectSyncControllableValue();
  useEffectDestroy();
}
