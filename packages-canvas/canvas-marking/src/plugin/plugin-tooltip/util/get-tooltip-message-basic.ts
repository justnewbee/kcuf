import _map from 'lodash/map';

import {
  IMarkingStats
} from '../../../types';

function generateTableInfo(info: Record<string, string>): string {
  return `<table>${_map(info, (v, k) => v ? `<tr><th>${k}</th><td>${v}</td></tr>` : '').join('')}</table>`;
}

export default function getTooltipMessageBasic<T = unknown>(stats: IMarkingStats<T>): string {
  const {
    itemStatsCreating,
    itemStatsHovering,
    itemStatsSelected
  } = stats;
  
  if (itemStatsCreating) {
    if (itemStatsCreating.creatingWillFinish) {
      return generateTableInfo({
        ['单击 / Space / Enter']: '完成绘制',
        Delete: '删除前一个节点',
        Esc: '取消新建'
      });
    }
    
    return generateTableInfo({
      ['单击 / Space']: `添加节点 #${(itemStatsCreating.path.length || 0) + 1}`,
      ['双击 / Enter']: '添加当前节点并完成绘制',
      Delete: '删除前一个节点',
      Esc: '取消新建'
    });
  }
  
  if (itemStatsSelected && itemStatsSelected.hovering) {
    let info: Record<string, string>;
    
    if (itemStatsSelected.hoveringPointIndex >= 0) {
      info = {
        ['拖拽']: itemStatsSelected.noEditDragPoint || itemStatsSelected.path.length < 2 ? '' : '移动节点',
        ['双击']: itemStatsSelected.noEditRemovePoint || itemStatsSelected.path.length < 2 ? '' : '删除节点',
        Enter: '完成编辑'
      };
    } else if (itemStatsSelected.hoveringInsertionPointIndex >= 0) {
      info = {
        ['拖拽']: '新增节点',
        Enter: '完成编辑'
      };
    } else {
      info = {
        ['拖拽']: itemStatsSelected.noEditDragWhole ? '' : '移动',
        ['双击 / Enter']: itemStatsSelected.noEdit ? '' : '完成编辑'
      };
    }
  
    return generateTableInfo({
      ...info,
      Delete: itemStatsSelected.noDelete ? '' : '删除',
      Esc: '取消选择'
    });
  }
  
  if (itemStatsHovering && !itemStatsHovering.noSelect) {
    return generateTableInfo({
      ['单击']: '选择'
    });
  }
  
  return '';
}
