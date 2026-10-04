import useHandleToggleVisible from './use-handle-toggle-visible';

export default function useHandleToggleVisibleTrue(): () => void {
  const handleToggleVisible = useHandleToggleVisible();
  
  return (): void => {
    handleToggleVisible(true);
  };
}
