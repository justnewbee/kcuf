import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  a11yReadableColor
} from '../../../../../src';

const ScColorBlock = styled.div`
  padding: 8px;
  border-radius: 3px;
`;

const ScPre = styled.pre`
  margin: 4px 0 0;
  padding: 0;
  font-size: 0.8em;
  white-space: break-spaces;
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
