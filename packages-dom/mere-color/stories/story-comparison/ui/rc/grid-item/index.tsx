import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  a11yReadableColor
} from '../../../../../src';

const ScColorBlock = styled.div`
  padding: 4px 8px;
  max-width: 180px;
  overflow-wrap: break-word;
  border-radius: 3px;
`;
const ScPre = styled.code`
  display: block;
  margin-block-start: 4px;
  font-size: 0.8em;
`;

interface IProps {
  color?: string | null;
  result?: string | number | null;
  code: string;
}

export default function GridItem({
  color,
  result,
  code
}: IProps): ReactElement {
  return <ScColorBlock {...{
    style: color ? {
      backgroundColor: color,
      color: a11yReadableColor(color)
    } : {
      backgroundColor: '#f7f7f7'
    }
  }}>
    <strong>{result ?? '💥'}</strong>
    {code ? <ScPre>{code}</ScPre> : null}
  </ScColorBlock>;
}
