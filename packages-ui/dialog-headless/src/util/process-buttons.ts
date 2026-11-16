import {
  isValidElement
} from 'react';

import {
  EDialogLockState
} from '../enum';
import {
  TDialogButton,
  IDialogButtonProps
} from '../types';

/**
 * 为了方便使用，button 可以传入 string | ReactElement | IDialogButtonProps，但最终使用的时候还是要转成 IDialogButtonProps
 */
function normalizeButton<R = void, D extends object = Record<string, unknown>>(button: TDialogButton<R, D>): IDialogButtonProps<R, D> {
  if (typeof button === 'string' || isValidElement(button)) {
    return {
      label: button
    };
  }
  
  return { // 因为需要往里边塞 disabled 等属性，故浅拷贝，保证不能修改传入的对象
    ...button
  };
}

/**
 * 获得最终用于展示的按钮 props
 */
export default function processButtons<R = void, D extends object = Record<string, unknown>>(buttons: TDialogButton<R, D>[] = [], locked: EDialogLockState): IDialogButtonProps<R, D>[] {
  const buttonAttr: IDialogButtonProps<R, D>[] = buttons.reduce((reduced: IDialogButtonProps<R, D>[], v: TDialogButton<R, D>) => {
    if (v) { // 过滤掉 null 等
      reduced.push(normalizeButton<R, D>(v));
    }
    
    return reduced;
  }, []);
  
  // 对于多于 2 个按钮的，最末一个自动为 primary
  if (!buttonAttr.some(v => v.primary) && buttonAttr.length > 1) {
    buttonAttr[buttonAttr.length - 1]!.primary = true; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  if (locked !== EDialogLockState.NO) {
    buttonAttr.forEach(v => {
      v.disabled = true;
      
      if (locked === EDialogLockState.LOADING && v.primary) {
        v.loading = true;
      }
    });
  }
  
  return buttonAttr;
}
