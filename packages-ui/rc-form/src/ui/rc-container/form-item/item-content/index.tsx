import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  mixinTextSecondary
} from '@kcuf/fork-console-base-theme';
import {
  FormItemProps
} from '@kcuf-ui/rc-form-headless';

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
  line-height: 1.4;
  ${mixinTextSecondary}
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
