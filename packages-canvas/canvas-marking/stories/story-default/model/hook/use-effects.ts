import useEffectInit from './use-effect-init';
import useEffectOptionEditable from './use-effect-option-editable';
import useEffectOptionDebugEvents from './use-effect-option-debug-events';
import useEffectDocumentFullscreen from './use-effect-document-fullscreen';
import useEffectDestroy from './use-effect-destroy';

export default function useEffects(): void {
  useEffectInit();
  useEffectOptionEditable();
  useEffectOptionDebugEvents();
  useEffectDocumentFullscreen();
  useEffectDestroy();
}
