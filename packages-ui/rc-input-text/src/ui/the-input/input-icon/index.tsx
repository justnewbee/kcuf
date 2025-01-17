import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Icon from '@kcuf-ui/rc-icon';
import {
  useProps,
  useValue,
  useHandleClear
} from '@kcuf-ui/rc-input-text-headless';

const ScIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 1.2em;
  transform: translateY(-50%);
`;
const ScIconClear = styled(ScIcon)`
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`;

export default function InputIcon(): ReactElement | null {
  const {
    status,
    withClear
  } = useProps();
  const value = useValue();
  const handleClear = useHandleClear();
  
  if (!value) {
    return null;
  }
  
  switch (status) {
  case 'loading':
    return <ScIcon type="loading" colored />;
  case 'success':
    return <ScIcon type="success" colored />;
  case 'error':
    return <ScIcon type="error" colored />;
  default:
    return withClear ? <ScIconClear type="clear" onClick={handleClear} /> : null;
  }
}
