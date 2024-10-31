import useEffectListen from './use-effect-listen';
import useEffectDetails from './use-effect-details';
import useEffectClearCodes from './use-effect-clear-codes';
import useEffectClearDetails from './use-effect-clear-details';

export default function useEffects(): void {
  useEffectListen();
  useEffectDetails();
  useEffectClearCodes();
  useEffectClearDetails();
}
