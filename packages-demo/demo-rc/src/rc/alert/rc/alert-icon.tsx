import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Icon, {
  IconType
} from '../../icon';
import {
  TAlertType
} from '../types';

interface IProps {
  type: TAlertType;
}

const ScIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 17px;
`;

function getIconType(type: TAlertType): IconType {
  switch (type) {
  case 'help':
    return 'help';
  case 'info':
    return 'info';
  case 'success':
    return 'success';
  case 'warn':
    return 'warn';
  case 'error':
    return 'error';
  default:
    return 'info';
  }
}

export default function AlertIcon({
  type
}: IProps): ReactElement {
  return <ScIcon type={getIconType(type)} colored />;
}
