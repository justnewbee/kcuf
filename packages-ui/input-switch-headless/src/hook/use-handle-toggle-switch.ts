import useModelProps from './_use-model-props';

export default function useHandleToggleSwitch(): () => void {
  const {
    disabled,
    value,
    onChange
  } = useModelProps();
  
  return () => {
    if (disabled) {
      return;
    }
    
    onChange(!value);
  };
}
