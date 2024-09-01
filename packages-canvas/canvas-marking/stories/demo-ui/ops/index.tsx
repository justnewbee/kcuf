import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  Button,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useMarkingStage,
  useFullscreen,
  useFloatingVisible,
  useHandleInit,
  useHandleDestroy,
  useHandleToggleFullscreen,
  useHandleToggleFloatingVisible,
  useHandleToggleDisabled,
  useHandleDebugStats,
  useMarkingStageStats,
  useHandleSetDataAerial,
  useHandleSetDataSexy,
  useHandleSetDataNoImage,
  useHandleSetDataEmpty,
  useHandleCreatingStart,
  useHandleCreatingStartMaxPoint5,
  useHandleCreatingStartRect,
  useHandleCreatingStartRect2,
  useHandleCreatingStartLine,
  useHandleCreatingCancel,
  useHandleCreatingFinish,
  useHandleDeleteActiveItem,
  useHandleDeleteAllItems,
  useHandleHighlightNext,
  useHandleHighlightNextBorder,
  useHandleHighlightNone,
  useHandleHighlightPrev,
  useHandleHighlightPrevBorder,
  useHandleZoomIn,
  useHandleZoomOut,
  useHandleZoomReset
} from '../../demo-model';

const ScActions = styled.div`
  margin-top: 8px;
`;

export default function Ops(): ReactElement {
  const markingStage = useMarkingStage();
  const markingStageStats = useMarkingStageStats();
  const fullscreen = useFullscreen();
  const floatingVisible = useFloatingVisible();
  const handleToggleFullscreen = useHandleToggleFullscreen();
  const handleToggleFloatingVisible = useHandleToggleFloatingVisible();
  const handleToggleDisabled = useHandleToggleDisabled();
  const handleInit = useHandleInit();
  const handleDestroy = useHandleDestroy();
  const handleDebugStats = useHandleDebugStats();
  const handleSetDataAerial = useHandleSetDataAerial();
  const handleSetDataSexy = useHandleSetDataSexy();
  const handleSetDataNoImage = useHandleSetDataNoImage();
  const handleSetDataEmpty = useHandleSetDataEmpty();
  const handleCreatingStart = useHandleCreatingStart();
  const handleCreatingStartMaxPoint5 = useHandleCreatingStartMaxPoint5();
  const handleCreatingStartRect = useHandleCreatingStartRect();
  const handleCreatingStartRect2 = useHandleCreatingStartRect2();
  const handleCreatingStartLine = useHandleCreatingStartLine();
  const handleCancelCreating = useHandleCreatingCancel();
  const handleFinishCreating = useHandleCreatingFinish();
  const handleDeleteActiveItem = useHandleDeleteActiveItem();
  const handleDeleteAllItems = useHandleDeleteAllItems();
  const handleHighlightNext = useHandleHighlightNext();
  const handleHighlightNextBorder = useHandleHighlightNextBorder();
  const handleHighlightNone = useHandleHighlightNone();
  const handleHighlightPrev = useHandleHighlightPrev();
  const handleHighlightPrevBorder = useHandleHighlightPrevBorder();
  const handleZoomIn = useHandleZoomIn();
  const handleZoomOut = useHandleZoomOut();
  const handleZoomReset = useHandleZoomReset();
  
  return <ScActions>
    <Button {...{
      onClick: handleToggleFullscreen
    }}>{fullscreen ? '退出全屏' : '进入全屏'}</Button>
    <Button {...{
      onClick: markingStage ? handleDestroy : handleInit
    }}>{markingStage ? 'destroy' : 'init'}</Button>
    {markingStage ? <>
      <Button {...{
        onClick: handleDebugStats
      }}>stats</Button>
      <Button {...{
        onClick: handleToggleDisabled
      }}>{markingStageStats?.disabled ? 'enable' : 'disable'}</Button>
      <InputSwitch {...{
        label: '浮动按钮',
        value: floatingVisible,
        onChange: handleToggleFloatingVisible
      }} />
      <br />
      <Button {...{
        onClick: handleSetDataAerial
      }}>航拍图</Button>
      <Button {...{
        onClick: handleSetDataSexy
      }}>性感图</Button>
      <Button {...{
        onClick: handleSetDataNoImage
      }}>无图</Button>
      <Button {...{
        onClick: handleSetDataEmpty
      }}>空</Button>
      <br />
      <Button {...{
        disabled: markingStageStats?.disabled || markingStageStats?.creating,
        onClick: handleCreatingStart
      }}>标注</Button>
      <Button {...{
        disabled: markingStageStats?.disabled || markingStageStats?.creating,
        onClick: handleCreatingStartMaxPoint5
      }}>标注（最多 5 点）</Button>
      <Button {...{
        disabled: markingStageStats?.disabled || markingStageStats?.creating,
        onClick: handleCreatingStartRect
      }}>标注（矩形）</Button>
      <Button {...{
        disabled: markingStageStats?.disabled || markingStageStats?.creating,
        onClick: handleCreatingStartRect2
      }}>标注（矩形 II）</Button>
      <Button {...{
        disabled: markingStageStats?.disabled || markingStageStats?.creating,
        onClick: handleCreatingStartLine
      }}>标注（线）</Button>
      <Button {...{
        disabled: !markingStageStats?.creating,
        onClick: handleCancelCreating
      }}>取消标注</Button>
      <Button {...{
        disabled: !markingStageStats?.creating,
        onClick: handleFinishCreating
      }}>完成标注</Button>
      <Button {...{
        disabled: !markingStageStats?.editing,
        onClick: handleDeleteActiveItem
      }}>删除</Button>
      <Button {...{
        disabled: !markingStageStats?.itemStatsList.length,
        onClick: handleDeleteAllItems
      }}>删除全部</Button>
      <br />
      <Button {...{
        onClick: handleHighlightPrev
      }}>highlight-prev</Button>
      <Button {...{
        onClick: handleHighlightNext
      }}>highlight-next</Button>
      <Button {...{
        onClick: handleHighlightPrevBorder
      }}>highlight-prev-border:first</Button>
      <Button {...{
        onClick: handleHighlightNextBorder
      }}>highlight-next-border:all</Button>
      <Button {...{
        onClick: handleHighlightNone
      }}>highlight-none</Button>
      <br />
      <Button {...{
        onClick: handleZoomOut
      }}>zoom-</Button>
      <Button {...{
        onClick: handleZoomIn
      }}>zoom+</Button>
      <Button {...{
        onClick: handleZoomReset
      }}>zoom reset</Button>
    </> : null}
  </ScActions>;
}