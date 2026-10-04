import useModelProps from './_use-model-props';

export default function useHandleFocusBack(): () => void {
  const {
    prevFocus
  } = useModelProps();
  
  return (): void => {
    if (prevFocus) {
      try {
        (prevFocus as HTMLElement).focus();
      } catch (_err) {
        // ignore
      }
    }
  };
}
