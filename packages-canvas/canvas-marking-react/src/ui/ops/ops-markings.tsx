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
} from '../../model';

export default function OpsMarkings(): ReactElement {
  const markingInstanceStats = useMarkingStageStats();
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
      disabled: markingInstanceStats?.disabled || markingInstanceStats?.creating,
      onClick: handleCreatingStart
    }}>标注</Button>
    <Button {...{
      disabled: markingInstanceStats?.disabled || markingInstanceStats?.creating,
      onClick: handleCreatingStartMaxPoint5
    }}>标注（最多 5 点）</Button>
    <Button {...{
      disabled: markingInstanceStats?.disabled || markingInstanceStats?.creating,
      onClick: handleCreatingStartRect
    }}>标注（矩形）</Button>
    <Button {...{
      disabled: markingInstanceStats?.disabled || markingInstanceStats?.creating,
      onClick: handleCreatingStartRect2
    }}>标注（矩形 II）</Button>
    <Button {...{
      disabled: markingInstanceStats?.disabled || markingInstanceStats?.creating,
      onClick: handleCreatingStartLine
    }}>标注（线）</Button>
    <Button {...{
      disabled: !markingInstanceStats?.creating,
      onClick: handleCancelCreating
    }}>取消标注</Button>
    <Button {...{
      disabled: !markingInstanceStats?.creating,
      onClick: handleFinishCreating
    }}>完成标注</Button>
    <Button {...{
      disabled: !markingInstanceStats?.editing,
      onClick: handleDeleteActiveItem
    }}>删除</Button>
    <Button {...{
      disabled: !markingInstanceStats?.itemStatsList.length,
      onClick: handleDeleteAllItems
    }}>删除全部</Button>
  </div>;
}
