import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useMarkingStats,
  useHandleCreate,
  useHandleCreateMaxPoint1,
  useHandleCreateMaxPoint5,
  useHandleCreateRect,
  useHandleCreateRect2,
  useHandleCreateLine,
  useHandleCancelCreating,
  useHandleFinishCreating,
  useHandleDeleteActiveItem,
  useHandleDeleteAllItems
} from '../../model';

export default function OpsMarkings(): ReactElement {
  const markingStats = useMarkingStats();
  const handleCreate = useHandleCreate();
  const handleCreateMaxPoint1 = useHandleCreateMaxPoint1();
  const handleCreateMaxPoint5 = useHandleCreateMaxPoint5();
  const handleCreateRect = useHandleCreateRect();
  const handleCreateRect2 = useHandleCreateRect2();
  const handleCreateLine = useHandleCreateLine();
  const handleCancelCreating = useHandleCancelCreating();
  const handleFinishCreating = useHandleFinishCreating();
  const handleDeleteActiveItem = useHandleDeleteActiveItem();
  const handleDeleteAllItems = useHandleDeleteAllItems();
  
  return <>
    <Button {...{
      onClick: handleCreate
    }}>自由</Button>
    <Button {...{
      onClick: handleCreateMaxPoint1
    }}>单点</Button>
    <Button {...{
      onClick: handleCreateLine
    }}>线（两点）</Button>
    <Button {...{
      onClick: handleCreateMaxPoint5
    }}>最多 5 点</Button>
    <Button {...{
      onClick: handleCreateRect
    }}>矩形</Button>
    <Button {...{
      onClick: handleCreateRect2
    }}>矩形 II</Button>
    <Button {...{
      disabled: !markingStats?.creating,
      onClick: handleCancelCreating
    }}>取消标注</Button>
    <Button {...{
      disabled: !markingStats?.creating,
      onClick: handleFinishCreating
    }}>完成标注</Button>
    <Button {...{
      disabled: !markingStats?.editing,
      onClick: handleDeleteActiveItem
    }}>删除</Button>
    <Button {...{
      disabled: !markingStats?.itemStatsList.length,
      onClick: handleDeleteAllItems
    }}>删除全部</Button>
  </>;
}
