import useEffectInit from './use-effect-init';
import useEffectDocumentFullscreen from './use-effect-document-fullscreen';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectDocumentFullscreen();
  useEffectDestroy();
}
