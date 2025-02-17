import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  FormItemProps
} from '@kcuf-ui/rc-form-headless';

import {
  COLOR_LIGHT,
  COLOR_DARK
} from '../../../../../../const';

interface IProps {
  label: FormItemProps['label'];
}

const ScItemLabel = styled.label`
  margin-right: 16px;
  box-sizing: border-box;
  color: ${COLOR_LIGHT.GRAY_PRIMARY};
  text-align: right;
  
  .theme-dark & {
    color: ${COLOR_DARK.GRAY_PRIMARY};
  }
`;

export default function ItemLabel({
  label
}: IProps): ReactElement | null {
  return label ? <ScItemLabel>{label}</ScItemLabel> : null;
}
