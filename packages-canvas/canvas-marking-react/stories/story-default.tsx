import {
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize,
  Hr,
  Form,
  InputSwitch,
  ChoiceGroupRadio
} from '@kcuf/demo-rc';
import {
  MarkingConfigItem
} from '@kcuf/canvas-marking';

import CanvasMarking from '../src';

import {
  EImageType
} from './enum';
import {
  DATASOURCE_IMAGE
} from './const';
import {
  getImageUrl,
  getMarkingItems
} from './util';

const ScCanvasMarking = styled(CanvasMarking)`
  min-height: 800px;
  resize: vertical;
`;

export default function StoryDefault(): ReactElement {
  const [stateImageType, setStateImageType] = useState<EImageType>(EImageType.ARIAL);
  const [stateImageUrl, setStateImageUrl] = useState('');
  const [stateMarkingItems, setStateMarkingItems] = useState<MarkingConfigItem[]>([]);
  const [stateDisabled, setStateDisabled] = useState(false);
  const [stateUnmounted, setStateUnmounted] = useState(false);
  
  useEffect(() => {
    setStateImageUrl(getImageUrl(stateImageType));
    setStateMarkingItems(getMarkingItems(stateImageType));
  }, [stateImageType, setStateImageUrl]);
  
  return <>
    <MinimalNormalize />
    {stateUnmounted ? null : <ScCanvasMarking {...{
      imageUrl: stateImageUrl,
      markingItems: stateMarkingItems,
      disabled: stateDisabled
    }} />}
    <Hr />
    <Form {...{
      dense: true,
      items: [{
        label: '数据源',
        content: <ChoiceGroupRadio<EImageType> {...{
          datasource: DATASOURCE_IMAGE,
          value: stateImageType,
          onChange: setStateImageType
        }} />
      }, {
        label: 'Disabled',
        content: <InputSwitch {...{
          value: stateDisabled,
          onChange: setStateDisabled
        }} />
      }, {
        label: '卸载组件',
        content: <InputSwitch {...{
          label: '测试 init 和 destroy effects',
          value: stateUnmounted,
          onChange: setStateUnmounted
        }} />
      }]
    }} />
  </>;
}
