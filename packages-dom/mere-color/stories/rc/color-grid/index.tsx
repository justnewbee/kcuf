import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  a11yReadableColor
} from '../../../src';

const ScColorBlock = styled.div`
  padding: 24px;
`;
const ScTitle = styled.div`
  margin-bottom: 4px;
  font-weight: 600;
`;

interface IProps {
  title: string;
  color?: string;
}

export default function ColorGrid({
  title,
  color
}: IProps): ReactElement {
  return <ScColorBlock {...{
    style: color ? {
      backgroundColor: color,
      color: a11yReadableColor(color)
    } : {
      backgroundColor: '#eee',
      color: '#c00'
    }
  }}>
    <ScTitle>{title}</ScTitle>
    <div>{color || '💥 Unavailable'}</div>
  </ScColorBlock>;
}
