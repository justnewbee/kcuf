import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  CSS_BLOCK_LEVEL_ELEMENT
} from '../../../const';
import Icon from '../../icon';
import {
  IAlertProps
} from '../types';
import {
  getIconType
} from '../util';

interface IScProps {
  $type: IAlertProps['type'];
}

const ScAlert = styled.div<IScProps>`
  position: relative;
  padding: 8px 12px;
  background-color: hsl(0 0% 0% / 3%);
  border-left: 2px solid transparent;
  ${CSS_BLOCK_LEVEL_ELEMENT}
`;
const ScAlertIcon = styled(Icon)`
  float: left;
  font-size: 16px;
`;
const ScAlertTitle = styled.header`
  margin-bottom: 4px;
  padding-left: 24px;
  font-size: 1.1em;
  font-weight: 600;
  line-height: 1.5;
`;
const ScAlertContent = styled.div`
  padding-left: 24px;
`;

export default function Alert({
  type = 'help',
  title,
  children,
  ...restProps
}: IAlertProps): ReactElement {
  return <ScAlert {...restProps} $type={type}>
    <ScAlertIcon type={getIconType(type)} colored />
    {title ? <ScAlertTitle>{title}</ScAlertTitle> : null}
    <ScAlertContent>{children}</ScAlertContent></ScAlert>;
}
