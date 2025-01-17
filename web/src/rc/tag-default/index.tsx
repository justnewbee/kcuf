import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import TagBase from '../tag-base';

interface IProps {
  children: string;
}

const ScDefault = styled(TagBase)`
  background: hsl(224 76% 48% / 7%);
  color: hsl(224 76% 48%);
  
  &::before {
    content: 'default: ';
  }
  
  html[data-theme="dark"] & {
    background: hsl(224 76% 48% / 17%);
    color: hsl(224 50% 61%);
  }
`;

export default function TagDefault({
  children
}: IProps): ReactElement {
  return <ScDefault>{children}</ScDefault>;
}
