import useEffectInit from './use-effect-init';
import useEffectDocumentFullscreen from './use-effect-document-fullscreen';
import useEffectLogEvents from './use-effect-log-events';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectDocumentFullscreen();
  useEffectLogEvents();
  useEffectDestroy();
}
