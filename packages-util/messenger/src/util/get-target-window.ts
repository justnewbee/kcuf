import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  TTargetWindow
} from '../types';

const thisWindow = getWindow();

export default function getTargetWindow(targetWindow: TTargetWindow = thisWindow): Window {
  switch (targetWindow) {
  case 'top':
    return thisWindow.top ?? thisWindow;
  case 'parent':
    return thisWindow.parent;
  default:
    return targetWindow;
  }
}
