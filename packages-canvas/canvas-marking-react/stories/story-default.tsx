import {
  ReactElement,
  useRef,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize,
  Hr,
  Button,
  Form,
  InputSwitch,
  ChoiceGroupRadio
} from '@kcuf/demo-rc';
import {
  ZoomHow,
  MarkingConfigItem
} from '@kcuf/canvas-marking';

import CanvasMarking, {
  CanvasMarkingImperativeRef
} from '../src';

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
  const ref = useRef<CanvasMarkingImperativeRef>(null);
  
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
      ref,
      imageUrl: stateImageUrl,
      markingItems: stateMarkingItems,
      disabled: stateDisabled
    }} />}
    <Hr />
    <Form {...{
      dense: true,
      items: [{
        label: 'create',
        content: <>
          <Button {...{
            onClick: () => ref.current?.startCreating()
          }}>默认</Button>
          <Button {...{
            onClick: () => ref.current?.startCreating({
              pointCountMax: 5
            })
          }}>最多 5 点</Button>
          <Button {...{
            onClick: () => ref.current?.startCreating({
              type: 'rect'
            })
          }}>矩形</Button>
          <Button {...{
            onClick: () => ref.current?.startCreating({
              type: 'rect2'
            })
          }}>矩形 II</Button>
          <Button {...{
            onClick: () => ref.current?.startCreating({
              pointStyle: {
                type: 'square'
              },
              pointCountMin: 2,
              pointCountMax: 2
            })
          }}>线</Button>
          <Button {...{
            onClick: () => ref.current?.cancelCreating()
          }}>取消</Button>
        </>
      }, {
        label: 'select',
        content: <>
          <Button {...{
            onClick: () => ref.current?.select('first')
          }}>first</Button>
          <Button {...{
            onClick: () => ref.current?.select('last')
          }}>last</Button>
          <Button {...{
            onClick: () => ref.current?.select(-1)
          }}>prev</Button>
          <Button {...{
            onClick: () => ref.current?.select(1)
          }}>next</Button>
          <Button {...{
            onClick: () => ref.current?.select(null)
          }}>none</Button>
        </>
      }, {
        label: 'highlight',
        content: <>
          <Button {...{
            onClick: () => ref.current?.highlight('first')
          }}>first</Button>
          <Button {...{
            onClick: () => ref.current?.highlight('last')
          }}>last</Button>
          <Button {...{
            onClick: () => ref.current?.highlight(-1)
          }}>prev</Button>
          <Button {...{
            onClick: () => ref.current?.highlight(1)
          }}>next</Button>
          <Button {...{
            onClick: () => ref.current?.highlight(null)
          }}>none</Button>
          <Button {...{
            onClick: () => ref.current?.highlight(-1, 0)
          }}>prev & border-first</Button>
          <Button {...{
            onClick: () => ref.current?.highlight(1, -1)
          }}>next & border-all</Button>
        </>
      }, {
        label: 'zoom',
        content: <>
          <Button {...{
            onClick: () => ref.current?.zoom(ZoomHow.IN)
          }}>zoom +</Button>
          <Button {...{
            onClick: () => ref.current?.zoom(ZoomHow.OUT)
          }}>zoom -</Button>
          <Button {...{
            onClick: () => ref.current?.zoom(ZoomHow.MIN)
          }}>zoom min</Button>
          <Button {...{
            onClick: () => ref.current?.zoom(ZoomHow.MAX)
          }}>zoom MAX</Button>
          <Button {...{
            onClick: () => ref.current?.zoom(ZoomHow.RESET)
          }}>zoom Reset</Button>
        </>
      }, {
        label: '打印数据',
        content: <Button {...{
          onClick: () => console.info(ref.current?.getStats()) // eslint-disable-line no-console
        }}>getStats</Button>
      }, {
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
