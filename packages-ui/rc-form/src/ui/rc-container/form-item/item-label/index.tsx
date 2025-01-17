import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  mixinTextPrimary
} from '@kcuf/fork-console-base-theme';
import {
  FormItemProps
} from '@kcuf-ui/rc-form-headless';

interface IProps {
  label: FormItemProps['label'];
}

const ScItemLabel = styled.label`
  padding-right: 16px;
  width: 140px;
  box-sizing: border-box;
  text-align: right;
  ${mixinTextPrimary}
`;

export default function ItemLabel({
  label
}: IProps): ReactElement | null {
  return label ? <ScItemLabel>{label}</ScItemLabel> : null;
}
