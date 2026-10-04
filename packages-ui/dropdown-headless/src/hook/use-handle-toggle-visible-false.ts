import useHandleToggleVisible from './use-handle-toggle-visible';

export default function useHandleToggleVisibleFalse(): () => void {
  const handleToggleVisible = useHandleToggleVisible();
  
  return (): void => {
    handleToggleVisible(false);
  };
}
