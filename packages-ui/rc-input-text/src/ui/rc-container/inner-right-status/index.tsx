import {
  ReactElement
} from 'react';

import Icon from '@kcuf-ui/rc-icon';
import {
  useProps,
  useValue,
  useHandleClear
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScInputInnerRight,
  ScInputClearButton
} from '../../sc';

export default function InnerRightStatus(): ReactElement | null {
  const {
    status,
    hasClear
  } = useProps();
  const value = useValue();
  const handleClear = useHandleClear();
  let jsx: ReactElement | undefined;
  
  if (!value) {
    return null;
  }
  
  switch (status) {
  case 'loading':
    jsx = <Icon type="loading" colored />;
    
    break;
  case 'success':
    jsx = <Icon type="success" colored />;
    
    break;
  case 'error':
    jsx = <Icon type="error" colored />;
    
    break;
  default:
    if (hasClear) {
      jsx = <ScInputClearButton onClick={handleClear}>
        <Icon type="clear" />
      </ScInputClearButton>;
    }
    
    break;
  }
  
  return jsx ? <ScInputInnerRight>{jsx}</ScInputInnerRight> : null;
}
