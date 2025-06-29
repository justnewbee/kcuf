import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  FormItemProps,
  useProps
} from '@kcuf-ui/rc-form-headless';
import {
  SIZE
} from '@kcuf/fork-console-base-theme';

import ItemLabel from './item-label';
import ItemContent from './item-content';

interface IScProps {
  $dense?: boolean;
}

const ScItem = styled.div<IScProps>`
  display: flex;
  margin-bottom: ${props => props.$dense ? 8 : 16}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_M}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export default function FormItem({
  label,
  content,
  help
}: FormItemProps): ReactElement {
  const {
    dense
  } = useProps();
  
  return <ScItem $dense={dense}>
    <ItemLabel label={label} />
    <ItemContent content={content} help={help} />
  </ScItem>;
}
