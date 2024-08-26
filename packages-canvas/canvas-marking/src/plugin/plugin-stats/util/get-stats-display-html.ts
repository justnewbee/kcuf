import {
  Point
} from '@kcuf/geometry-basic';

import {
  EMarkingStatsChangeCause
} from '../../../enum';
import {
  TSize,
  IMarkingStageStats
} from '../../../types';

function displayBool(value: boolean): string {
  return value ? '✅' : '❌';
}

function displayPercentage(n: number): string {
  const [i, f0] = (n * 100).toFixed(2).split('.') as [string, string];
  const f = f0.replace(/0+$/, '');
  
  return f ? `${i}.${f}%` : `${i}%`;
}

function displaySize([w, h]: TSize): string {
  return `${w} 𝗑 ${h}`;
}

function displayPoint(point: Point | null): string {
  return point ? `(${point[0]}, ${point[1]})` : 'null';
}

function displayIndexAndPoint(index: number, point: Point | null): string {
  return `${index} / ${displayPoint(point)}`;
}

export default function getStatsDisplayHtml<T>(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): string {
  return `<ul>${[
    ['Cause', cause],
    ['TimeStamp', Date.now()],
    // 禁用
    ['Disabled', displayBool(stats.disabled)],
    // 大小
    ['StageSize', displaySize(stats.stageSize)],
    ['CanvasSize', displaySize(stats.canvasSize)],
    ['CanvasCoords', displayPoint(stats.canvasCoords)],
    ['ImageStatus', stats.imageStatus],
    ['ImageSize', displaySize(stats.imageSize)],
    ['ImageScale', displayPercentage(stats.imageScale)],
    ['ImageMouse', displayPoint(stats.imageMouse)],
    ['Zoom', displayPercentage(stats.zoom)],
    // 鼠标状态
    ['MouseInStage', displayPoint(stats.mouseInStage)],
    ['MouseInCanvas', displayPoint(stats.mouseInCanvas)],
    ['MouseDownCanvas', displayBool(stats.mouseDownCanvas)],
    ['MouseDownMoving', displayBool(stats.mouseDownMoving)],
    // 移动
    ['Moving', displayBool(stats.moving)],
    ['MovingCoordsStart', displayPoint(stats.movingCoordsStart)],
    ['MovingCoords', displayPoint(stats.movingCoords)],
    // 与 MarkingItem 有关的状态
    ['Creating', displayBool(stats.creating)],
    ['CreatingStarted', displayBool(stats.creatingStarted)],
    ['CreatingCrossing', displayBool(stats.creatingCrossing)],
    ['Highlighting', displayBool(stats.highlighting)],
    ['Hovering', displayBool(stats.hovering)],
    ['HoveringPoint', displayIndexAndPoint(stats.hoveringPointIndex, stats.itemStatsHovering?.path[stats.hoveringPointIndex] || null)],
    ['HoveringInsertionPoint', stats.hoveringInsertionPointIndex],
    ['HoveringBorder', stats.hoveringBorderIndex],
    ['Editing', displayBool(stats.editing)],
    ['EditingDirty', displayBool(stats.editingDirty)],
    ['EditingCrossing', displayBool(stats.editingCrossing)],
    ['EditingHovering', displayBool(stats.editingHovering)],
    ['EditingHoveringPoint', stats.editingHoveringPointIndex],
    ['EditingHoveringInsertionPoint', stats.editingHoveringInsertionPointIndex],
    ['EditingHoveringBorder', stats.editingHoveringBorderIndex],
    ['EditingDragging', displayBool(stats.editingDragging)],
    ['EditingDraggingPoint', stats.editingDraggingPointIndex],
    ['EditingDraggingInsertionPoint', stats.editingDraggingInsertionPointIndex],
    // 数据
    ['MarkingItems', stats.itemStatsList.length]
  ].map(v => {
    return `<li><span class="label">${v[0]}</span><span>${v[1]}</span></li>`;
  }).join('')}</ul>`;
}