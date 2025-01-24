import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  ColorLevels
} from '../../../../src';
import {
  ColorBlockBase
} from '../../../rc';
import {
  useStateDark
} from '../../model';
import ColorBlockItem from '../color-block-item';

interface IProps {
  title: string;
  titleColor?: string;
  lists: [ColorLevels, ColorLevels];
}

const ScTitle = styled(ColorBlockBase)`
  align-items: flex-start;
  font-weight: 600;
`;

export default function ColorBlockList({
  title,
  titleColor,
  lists
}: IProps): ReactElement {
  const [dark] = useStateDark();
  const list = dark ? lists[1] : lists[0];
  
  return <>
    <ScTitle {...{
      style: {
        color: titleColor ?? list[8]
      }
    }}>{title}</ScTitle>
    {list.map(v => <ColorBlockItem key={v} {...{
      color: v
    }} />)}
  </>;
}
