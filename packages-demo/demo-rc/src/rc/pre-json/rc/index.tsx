import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  json5Stringify
} from '../../../util';
import {
  IPreJsonProps
} from '../types';

const ScPre = styled.pre`
  margin: 0;
  padding: 8px;
  font-size: 0.95em;
  white-space: break-spaces;
`;

/**
 * 展示简化的 JSON
 */
export default function PreJson({
  o
}: IPreJsonProps): ReactElement {
  return <ScPre>{json5Stringify(o)}</ScPre>;
}
