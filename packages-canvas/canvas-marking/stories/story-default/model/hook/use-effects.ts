import useEffectInit from './use-effect-init';
import useEffectUpdateOptions from './use-effect-update-options';
import useEffectDocumentFullscreen from './use-effect-document-fullscreen';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectUpdateOptions();
  useEffectDocumentFullscreen();
  useEffectDestroy();
}
