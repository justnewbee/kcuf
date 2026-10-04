import useModelProps from './_use-model-props';
import useDispatchSetVisible from './use-dispatch-set-visible';

export default function useHandleDocKeydown(): (e: KeyboardEvent) => void {
  const {
    onEsc,
    onNavUp,
    onNavDown
  } = useModelProps();
  const dispatchToggleVisible = useDispatchSetVisible();
  
  return (e: KeyboardEvent): void => {
    switch (e.key) {
    case 'Escape':
      dispatchToggleVisible(false);
      onEsc?.();
        
      break;
    case 'ArrowDown':
      if (onNavDown) {
        e.preventDefault();
          
        onNavDown();
      }
        
      break;
    case 'ArrowUp':
      if (onNavUp) {
        e.preventDefault();
          
        onNavUp();
      }
        
      break;
    default:
      break;
    }
  };
}
