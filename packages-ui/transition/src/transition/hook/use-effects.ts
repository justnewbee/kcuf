import useEffectMount from './use-effect-mount';
import useEffectTransitionIn from './use-effect-transition-in';
import useEffectTransitionOut from './use-effect-transition-out';

export default function useEffects(): void {
  useEffectMount();
  useEffectTransitionIn();
  useEffectTransitionOut();
}
