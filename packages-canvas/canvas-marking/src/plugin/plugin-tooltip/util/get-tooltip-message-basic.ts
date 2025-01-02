import {
  ICanvasMarkingOptions,
  IMarkingStats
} from '../../../types';

export default function getTooltipMessageBasic<T = unknown>(stats: IMarkingStats<T>, options: ICanvasMarkingOptions<T>): string {
  if (stats.moving) {
    return `<strong>拖拽：</strong>移动画布
<strong>空格：</strong>取消移动`;
  }
  
  if (!stats.editable) {
    return '';
  }
  
  if (stats.creating && stats.itemStatsCreating) {
    if (stats.itemStatsCreating.creatingWillFinish) {
      return `<strong>单击 / 空格 / 回车：</strong>完成绘制
<strong>Delete / Backspace：</strong>删除前一个节点
<strong>Esc：</strong>取消新建`;
    }
    
    return `<strong>单击 / 空格：</strong>添加节点 #${(stats.itemStatsCreating.path.length || 0) + 1}
<strong>双击 / 回车：</strong>添加当前节点并完成绘制
<strong>Delete / Backspace：</strong>删除前一个节点
<strong>Esc：</strong>取消新建`;
  }
  
  if (stats.editingHoveringPointIndex >= 0) {
    return `<strong>拖拽：</strong>移动节点
<strong>双击：</strong>删除节点
<strong>回车：</strong>完成编辑
<strong>Esc：</strong>取消编辑（恢复为编辑前）`;
  }
  
  if (stats.editingHoveringInsertionPointIndex >= 0) {
    return `<strong>拖拽：</strong>新增节点
<strong>回车：</strong>完成编辑
<strong>Esc：</strong>取消编辑（恢复为编辑前）`;
  }
  
  if (stats.editingHovering) {
    return `${options.noDragWhole ? '' : '<strong>拖拽：</strong>移动路径\n'}<strong>双击 / 回车：</strong>完成编辑
<strong>Delete / Backspace：</strong>删除
<strong>Esc：</strong>取消编辑（恢复为编辑前）`;
  }
  
  if (stats.hovering) {
    return '<strong>单击：</strong>激活（进入编辑）';
  }
  
  if (stats.editing) {
    return `<strong>双击 / 回车：</strong>完成编辑
<strong>Delete / Backspace：</strong>删除
<strong>Esc：</strong>取消编辑（恢复为编辑前）`;
  }
  
  return '';
}
