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
  content: FormItemProps['content'];
  help: FormItemProps['help'];
}

const ScItemContent = styled.div`
  flex: 1;
  word-break: break-all;
`;
const ScHelp = styled.div`
  margin-top: 4px;
  color: ${COLOR_LIGHT.GRAY_SECONDARY};
  line-height: 1.4;
  
  .theme-dark & {
    color: ${COLOR_DARK.GRAY_SECONDARY};
  }
`;

export default function ItemContent({
  content,
  help
}: IProps): ReactElement {
  return <ScItemContent>
    {content}
    {help ? <ScHelp>{help}</ScHelp> : null}
  </ScItemContent>;
}
