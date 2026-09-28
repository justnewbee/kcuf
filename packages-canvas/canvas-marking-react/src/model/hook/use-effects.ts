import useEffectInit from './use-effect-init';
import useEffectDestroy from './use-effect-destroy';
import useEffectSetData from './use-effect-set-data';
import useEffectRegisterPlugins from './use-effect-register-plugins';
import useEffectSetOptions from './use-effect-set-options';

export default function useEffects(): void {
  useEffectInit();
  useEffectDestroy();
  useEffectSetData();
  useEffectRegisterPlugins();
  useEffectSetOptions();
}
