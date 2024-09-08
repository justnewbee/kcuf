import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useMarkingStageStats,
  useHandleCreatingStart,
  useHandleCreatingStartMaxPoint5,
  useHandleCreatingStartRect,
  useHandleCreatingStartRect2,
  useHandleCreatingStartLine,
  useHandleCreatingCancel,
  useHandleCreatingFinish,
  useHandleDeleteActiveItem,
  useHandleDeleteAllItems
} from '../../demo-model';

export default function OpsMarkings(): ReactElement {
  const markingStageStats = useMarkingStageStats();
  const handleCreatingStart = useHandleCreatingStart();
  const handleCreatingStartMaxPoint5 = useHandleCreatingStartMaxPoint5();
  const handleCreatingStartRect = useHandleCreatingStartRect();
  const handleCreatingStartRect2 = useHandleCreatingStartRect2();
  const handleCreatingStartLine = useHandleCreatingStartLine();
  const handleCancelCreating = useHandleCreatingCancel();
  const handleFinishCreating = useHandleCreatingFinish();
  const handleDeleteActiveItem = useHandleDeleteActiveItem();
  const handleDeleteAllItems = useHandleDeleteAllItems();
  
  return <div>
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
  </div>;
}