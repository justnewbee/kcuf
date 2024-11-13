import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';
import {
  readableColor,
  getContrast
} from 'polished';

import {
  ColorLevels
} from '../../../src';
import {
  hslUnwrap
} from '../../util';

interface IProps {
  title: string;
  lists: [ColorLevels, ColorLevels];
  text?: boolean;
  dark?: boolean;
  transparent?: boolean;
}

interface IScColorBlockProps {
  $transparent?: boolean;
}

const ScColorBlock = styled.div<IScColorBlockProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 8px 4px;
  border-radius: 2px;
  font-size: 10px;
  ${props => props.$transparent ? css`
    background: #f2f2f2 0 0/16px 16px url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"%3E%3Cpath d="M1 2V0h1v1H0v1z" fill-opacity=".07"/%3E%3C/svg%3E')
  ` : null}
`;

const ScContrast = styled.div`
  margin-top: 4px;
  opacity: 0.75;
  font-weight: 200;
`;

export default function ColorBlockList(props: IProps): ReactElement {
  const {
    title,
    lists,
    text,
    dark,
    transparent
  } = props;
  const list = dark ? lists[1] : lists[0];
  
  return <>
    <ScColorBlock {...{ // 左侧标题
      style: {
        color: transparent ? 'hsl(0 0% 50%)' : list[8],
        justifyContent: 'flex-end',
        fontWeight: 600
      }
    }}>{title}
    </ScColorBlock>
    {list.map(v => <ScColorBlock
      key={v}
      {...{
        $transparent: transparent,
        style: text ? {
          color: v
        } : {
          backgroundColor: v,
          color: readableColor(v, undefined, transparent ? 'hsl(330 100% 60%)' : undefined)
        }
      }}>
      <div>{hslUnwrap(v)}</div>
      {transparent ? null : <ScContrast>{getContrast(v, dark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)')}</ScContrast>}
    </ScColorBlock>)}
  </>;
}
