import styled from 'styled-components';

import {
  ButtonIconSpacing
} from '@kcuf/rc-button-headless';

import {
  getStyleIconSpacing
} from '../../util';

interface IProps {
  className?: string;
  iconSpacing?: ButtonIconSpacing;
}

export default styled.span<IProps>`
  display: inline-flex;
  margin: 0 ${props => getStyleIconSpacing(props.iconSpacing)}px;
  min-width: 12px;
  text-align: left;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;
