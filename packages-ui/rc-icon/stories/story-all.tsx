import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputText,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

import Icon, {
  ICON_TYPES
} from '../src';

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
  const [stateEyeCatching, setStateEyeCatching] = useState(false);
  const filterTrimmed = stateFilter.trim();
  const filteredTypes = filterTrimmed ? ICON_TYPES.filter(v => v.includes(filterTrimmed)) : ICON_TYPES;
  
  return <>
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
    <InputSwitch {...{
      label: 'eyeCatching',
      value: stateEyeCatching,
      onChange: setStateEyeCatching
    }} />
    {filterTrimmed ? `${filteredTypes.length} / ${ICON_TYPES.length}` : null}
    <ScIconList>
      {filteredTypes.map(v => <ScIconListItem key={v}>
        <Icon {...{
          type: v,
          colored: stateColored,
          rotate: stateRotate,
          eyeCatching: stateEyeCatching
        }} />
        <div>{v}</div>
      </ScIconListItem>)}
    </ScIconList>
  </>;
}
