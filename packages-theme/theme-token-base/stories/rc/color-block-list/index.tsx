import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  ColorLevels
} from '../../../src';
import {
  ScColorBlock
} from '../../sc';

import ColorBlockItem from './color-block-item';

interface IProps {
  title: string;
  lists: [ColorLevels, ColorLevels];
  text?: boolean;
  dark?: boolean;
  transparent?: boolean;
}

const ScTitle = styled(ScColorBlock)`
  align-items: flex-start;
  font-weight: 600;
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
    <ScTitle {...{
      style: {
        color: transparent ? 'hsl(0 0% 50%)' : list[8]
      }
    }}>{title}</ScTitle>
    {list.map(v => <ColorBlockItem key={v} {...{
      color: v,
      text,
      transparent,
      dark
    }} />)}
  </>;
}
