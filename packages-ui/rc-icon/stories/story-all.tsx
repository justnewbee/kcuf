import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize,
  InputText,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

import Icon, {
  IconType
} from '../src';
import {
  ICON_TYPE_MAPPING
} from '../src/const';

import PkgInfo from './rc/pkg-info';

const TYPES: IconType[] = Object.keys(ICON_TYPE_MAPPING) as IconType[];

const ScIconList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ScIconListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 50px;
  min-width: 50px;
  color: hsl(0 0% 73%);
  text-align: center;
  
  i {
    color: hsl(0 0% 20%);
    font-size: 20px;
  }
  
  &:hover {
    background-color: hsla(0 0% 0% / 10%);
  }
`;

export default function StoryAll(): ReactElement {
  const [stateFilter, setStateFilter] = useState('');
  const [stateRotate, setStateRotate] = useState(0);
  const [stateColored, setStateColored] = useState(true);
  const filterTrimmed = stateFilter.trim();
  const filteredTypes = filterTrimmed ? TYPES.filter(v => v.includes(filterTrimmed)) : TYPES;
  
  return <>
    <MinimalNormalize />
    <PkgInfo />
    <InputText {...{
      placeholder: 'filter',
      value: stateFilter,
      onChange: setStateFilter
    }} />
    <InputNumber {...{
      placeholder: 'rotate',
      value: stateRotate,
      onChange: setStateRotate
    }} />
    <InputSwitch {...{
      label: 'colored',
      value: stateColored,
      onChange: setStateColored
    }} />
    {filterTrimmed ? `${filteredTypes.length} / ${TYPES.length}` : null}
    <ScIconList>
      {filteredTypes.map(v => <ScIconListItem key={v}>
        <Icon {...{
          type: v,
          colored: stateColored,
          rotate: stateRotate
        }} />
        <div>{v}</div>
      </ScIconListItem>)}
    </ScIconList>
  </>;
}
