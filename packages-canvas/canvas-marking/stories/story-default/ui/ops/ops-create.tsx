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
  useHandleCreateSvgPoint,
  useHandleCancelCreating,
  useHandleFinishCreating
} from '../../model';

export default function OpsCreate(): ReactElement {
  const markingStats = useMarkingStats();
  const handleCreate = useHandleCreate();
  const handleCreateMaxPoint1 = useHandleCreateMaxPoint1();
  const handleCreateMaxPoint5 = useHandleCreateMaxPoint5();
  const handleCreateRect = useHandleCreateRect();
  const handleCreateRect2 = useHandleCreateRect2();
  const handleCreateLine = useHandleCreateLine();
  const handleCreateSvgPoint = useHandleCreateSvgPoint();
  const handleCancelCreating = useHandleCancelCreating();
  const handleFinishCreating = useHandleFinishCreating();
  
  return <>
    <Button {...{
      label: '自由',
      onClick: handleCreate
    }} />
    <Button {...{
      label: '单点',
      onClick: handleCreateMaxPoint1
    }} />
    <Button {...{
      label: '线（两点）',
      onClick: handleCreateLine
    }} />
    <Button {...{
      label: '最多 5 点',
      onClick: handleCreateMaxPoint5
    }} />
    <Button {...{
      label: '矩形',
      onClick: handleCreateRect
    }} />
    <Button {...{
      label: '矩形 II',
      onClick: handleCreateRect2
    }} />
    <Button {...{
      label: 'SVG 点',
      onClick: handleCreateSvgPoint
    }} />
    <br />
    <Button {...{
      label: '取消标注',
      disabled: !markingStats?.creating,
      onClick: handleCancelCreating
    }} />
    <Button {...{
      label: '完成标注',
      disabled: !markingStats?.creating,
      onClick: handleFinishCreating
    }} />
  </>;
}
