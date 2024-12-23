import useEffectWatchZIndex from './use-effect-watch-z-index';
import useEffectMessageRefresh from './use-effect-message-refresh';
import useEffectUnmounted from './use-effect-unmounted';

export default function useEffects(): void {
  useEffectWatchZIndex();
  useEffectMessageRefresh();
  useEffectUnmounted();
}
