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

function displayCoords(coords: Point | null): string {
  return coords ? `${coords[0]}, ${coords[1]}` : 'null';
}

export default function getStatsDisplayHtml<T>(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): string {
  return `<ul>${[
    // 变更原因
    ['Cause', cause],
    // 禁用
    ['Disabled', displayBool(stats.disabled)],
    // 大小
    ['StageSize', displaySize(stats.stageSize)],
    ['CanvasSize', displaySize(stats.canvasSize)],
    ['CanvasCoords', displayCoords(stats.canvasCoords)],
    ['ImageStatus', stats.imageStatus],
    ['ImageSize', displaySize(stats.imageSize)],
    ['ImageScale', displayPercentage(stats.imageScale)],
    ['ImageMouse', displayCoords(stats.imageMouse)],
    ['Zoom', displayPercentage(stats.zoom)],
    // 鼠标状态
    ['MouseInStage', displayCoords(stats.mouseInStage)],
    ['MouseInCanvas', displayCoords(stats.mouseInCanvas)],
    ['MouseDownCanvas', displayBool(stats.mouseDownCanvas)],
    ['MouseDownMoving', displayBool(stats.mouseDownMoving)],
    // 移动
    ['Moving', displayBool(stats.moving)],
    ['MovingCoordsStart', displayCoords(stats.movingCoordsStart)],
    ['MovingCoords', displayCoords(stats.movingCoords)],
    // 与 MarkingItem 有关的状态
    ['Creating', displayBool(stats.creating)],
    ['CreatingStarted', displayBool(stats.creatingStarted)],
    ['CreatingCrossing', displayBool(stats.creatingCrossing)],
    ['Highlighting', displayBool(stats.highlighting)],
    ['Hovering', displayBool(stats.hovering)],
    ['HoveringPoint', stats.hoveringPoint],
    ['HoveringInsertionPoint', stats.hoveringInsertionPoint],
    ['HoveringBorder', stats.hoveringBorder],
    ['Editing', displayBool(stats.editing)],
    ['EditingDirty', displayBool(stats.editingDirty)],
    ['EditingCrossing', displayBool(stats.editingCrossing)],
    ['EditingHovering', displayBool(stats.editingHovering)],
    ['EditingHoveringPoint', stats.editingHoveringPoint],
    ['EditingHoveringInsertionPoint', stats.editingHoveringInsertionPoint],
    ['EditingHoveringBorder', stats.editingHoveringBorder],
    ['EditingDragging', displayBool(stats.editingDragging)],
    ['EditingDraggingPoint', stats.editingDraggingPoint],
    ['EditingDraggingInsertionPoint', stats.editingDraggingInsertionPoint],
    // 数据
    ['MarkingItems', stats.itemStatsList.length]
  ].map(v => {
    return `<li><span class="label">${v[0]}</span><span>${v[1]}</span></li>`;
  }).join('')}</ul>`;
}