import {
  focusDialog
} from '../util';

import useModelState from './_use-model-state';

export default function useHandleFocus(): () => void {
  const {
    domDialog,
    domDialogContent
  } = useModelState();
  
  return (): void => {
    if (domDialog && domDialogContent) {
      focusDialog(domDialog, domDialogContent);
    }
  };
}
