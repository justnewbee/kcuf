import _map from 'lodash/map';

import {
  ICanvasMarkingOptions,
  IMarkingStats
} from '../../../types';

function generateTableInfo(info: Record<string, string>): string {
  return `<table>${_map(info, (v, k) => v ? `<tr><th>${k}</th><td>${v}</td></tr>` : '').join('')}</table>`;
}

export default function getTooltipMessageBasic<T = unknown>(stats: IMarkingStats<T>, options: ICanvasMarkingOptions<T>): string {
  if (stats.moving) {
    return '';
  }
  
  const {
    itemStatsCreating,
    itemStatsHovering,
    itemStatsEditing
  } = stats;
  
  if (itemStatsCreating) {
    if (itemStatsCreating.creatingWillFinish) {
      return generateTableInfo({
        ['单击 / 空格 / 回车']: '完成绘制',
        ['Delete']: '删除前一个节点',
        Esc: '取消新建'
      });
    }
    
    return generateTableInfo({
      ['单击 / 空格']: `添加节点 #${(itemStatsCreating.path.length || 0) + 1}`,
      ['双击 / 回车']: '添加当前节点并完成绘制',
      ['Delete']: '删除前一个节点',
      Esc: '取消新建'
    });
  }
  
  if (itemStatsHovering) {
    if (itemStatsEditing) {
      let info: Record<string, string> = {};
    
      if (stats.editingHoveringPointIndex >= 0) {
        info = {
          ['拖拽']: options.noEditDragPoint ? '' : '移动节点',
          ['双击']: options.noEditRemovePoint ? '' : '删除节点',
          ['回车']: '完成编辑'
        };
      } else if (stats.editingHoveringInsertionPointIndex >= 0) {
        info = {
          ['拖拽']: '新增节点',
          ['回车']: '完成编辑'
        };
      } else if (stats.editingHovering) {
        info = {
          ['拖拽']: options.noEditDragWhole ? '' : '移动路径',
          ['双击 / 回车']: '完成编辑'
        };
      }
    
      return generateTableInfo({
        ...info,
        Delete: '删除',
        Esc: '取消编辑（恢复为编辑前）'
      });
    }
    
    if (!itemStatsHovering.noSelect) {
      return generateTableInfo({
        ['单击']: '选择'
      });
    }
  }
  
  return '';
}
