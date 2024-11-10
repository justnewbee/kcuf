import {
  MouseEvent,
  ReactElement,
  useCallback
} from 'react';
import styled from 'styled-components';

import Button, {
  ButtonPreset,
  ButtonProps
} from '@kcuf/rc-button';

import {
  DialogButtonProps,
  useDialog,
  useDispatchLock,
  useDispatchUnlock,
  useHandleCloseWithValue
} from '../../../../model';

const ScButton = styled(Button)`
  margin-right: 8px;
  min-width: 68px;
  
  &:last-child {
    margin-right: 0;
  }
`;

export default function FooterButton({
  result,
  primary,
  onClick,
  ...buttonProps
}: DialogButtonProps<any>): ReactElement { // eslint-disable-line @typescript-eslint/no-explicit-any
  const dialog = useDialog<unknown>();
  const dispatchLock = useDispatchLock();
  const dispatchUnlock = useDispatchUnlock();
  const dispatchCloseWithValue = useHandleCloseWithValue<unknown>();
  
  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    let willClose: boolean | void = false;
    
    if (onClick) {
      willClose = onClick(dialog, e);
    }
    
    if (willClose === false) {
      return;
    }
    
    let finalResult = result;
    
    if (typeof result === 'function') {
      finalResult = result(dialog.data);
      
      if ((finalResult as Promise<unknown>).then) { // 弱判
        dispatchLock(true);
        
        (finalResult as Promise<unknown>).then(resultResult => {
          dispatchUnlock();
          dispatchCloseWithValue(resultResult);
        }, err => {
          dispatchUnlock();
          dispatchCloseWithValue(err, true);
        });
        
        return;
      }
    }
    
    dispatchCloseWithValue(finalResult);
  }, [onClick, result, dispatchCloseWithValue, dialog, dispatchLock, dispatchUnlock]);
  
  return <ScButton {...{
    ...buttonProps as ButtonProps,
    preset: primary ? ButtonPreset.PRIMARY : ButtonPreset.SECONDARY,
    onClick: handleClick
  }} />;
}
