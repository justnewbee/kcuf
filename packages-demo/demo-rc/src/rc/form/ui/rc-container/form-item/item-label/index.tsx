import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  FormItemProps
} from '@kcuf/rc-headless-form';

import {
  COLOR_LIGHT,
  COLOR_DARK
} from '../../../../../../const';

interface IProps {
  label: FormItemProps['label'];
}

const ScItemLabel = styled.label`
  padding-right: 16px;
  box-sizing: border-box;
  width: 140px;
  text-align: right;
  color: ${COLOR_LIGHT.GRAY_PRIMARY};
  
  .theme-dark & {
    color: ${COLOR_DARK.GRAY_PRIMARY};
  }
`;

export default function ItemLabel({
  label
}: IProps): ReactElement | null {
  return label ? <ScItemLabel>{label}</ScItemLabel> : null;
}
