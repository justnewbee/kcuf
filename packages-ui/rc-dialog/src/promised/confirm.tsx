import {
  ReactElement
} from 'react';

import {
  IDialogPropsConfirm,
  IAltConfirmExtra
} from '../types';
import {
  SYS_DIALOG_PROPS_FIXED,
  SYS_DIALOG_PROPS_DEFAULT
} from '../const';
import {
  buildPropsForPromise
} from '../util';
import {
  AltWrap
} from '../rc';

import {
  open
} from './open';

/**
 * 系统 `window.confirm` 的替代
 *
 * ```
 * import {
 *   confirm
 * } from '@kcuf/rc-dialog';
 *
 * confirm(...).then(yes => {
 *   ...
 * });
 *
 * // 也可以用 async-await
 * const yes = await alert(...);
 * ```
 */
export default function confirm(contentOrProps?: string | ReactElement | IDialogPropsConfirm, extra: IAltConfirmExtra = {}): Promise<boolean> {
  const promiseProps = buildPropsForPromise<boolean>(contentOrProps, {
    buttons: [{
      label: extra.cancel || '取消'
    }, {
      label: extra.ok || '确定',
      result: true
    }],
    ...SYS_DIALOG_PROPS_FIXED
  }, SYS_DIALOG_PROPS_DEFAULT);
  
  promiseProps.content = <AltWrap {...{
    type: extra.type || 'confirm',
    title: promiseProps.title as IDialogPropsConfirm['title'],
    content: promiseProps.content
  }} />;
  
  return open<boolean>(promiseProps).then((result: unknown) => !!result);
}
