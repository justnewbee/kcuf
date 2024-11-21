import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  CSS_BLOCK_LEVEL_ELEMENT
} from '../../../const';
import {
  IAlertProps
} from '../types';

import AlertIcon from './alert-icon';

interface IScProps {
  $type: IAlertProps['type'];
}

const ScAlert = styled.div<IScProps>`
  position: relative;
  padding: 8px 12px 8px 36px;
  background-color: hsl(0 0% 0% / 3%);
  border-left: 2px solid transparent;
  ${CSS_BLOCK_LEVEL_ELEMENT}
  
  header {
    margin-bottom: 4px;
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.5;
  }
`;

export default function Alert({
  type = 'help',
  title,
  children,
  ...restProps
}: IAlertProps): ReactElement {
  return <ScAlert {...restProps} $type={type}>
    <AlertIcon type={type} />
    {title ? <header>{title}</header> : null}
    {children}
  </ScAlert>;
}
