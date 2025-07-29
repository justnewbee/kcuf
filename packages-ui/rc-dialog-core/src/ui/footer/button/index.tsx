import {
  MouseEvent,
  ReactElement,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  DialogButtonProps,
  useDialog,
  useDispatchLock,
  useDispatchUnlock,
  useHandleCloseWithValue
} from '@kcuf-ui/rc-dialog-headless';
import Button, {
  ButtonPreset,
  ButtonProps
} from '@kcuf-ui/rc-button';

const ScButton = styled(Button)`
  margin-right: 8px;
  min-width: 68px;
  letter-spacing: 1px;
  
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
    let willClose: boolean | undefined;
    
    if (onClick) {
      willClose = onClick(dialog, e) as boolean | undefined;
    }
    
    if (willClose === false) {
      return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let finalResult = result;
    
    if (typeof result === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      finalResult = result(dialog.data);
      
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if ((finalResult as Promise<unknown>)?.then) { // 弱判
        dispatchLock(true);
        
        (finalResult as Promise<unknown>).then(resultResult => {
          dispatchUnlock();
          dispatchCloseWithValue(resultResult);
        }, (err: unknown) => {
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
    preset: primary ? ButtonPreset.PRIMARY : ButtonPreset.TERTIARY,
    onClick: handleClick
  }} />;
}
