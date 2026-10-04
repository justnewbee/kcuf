import useModelProps from './_use-model-props';

export default function useHandleClick(): () => void {
  const {
    closable = true,
    onClose
  } = useModelProps();
  
  return (): void => {
    if (closable) {
      onClose?.();
    }
  };
}
