import {
  EMarkingStatsChangeCause
} from '../../../enum';
import {
  IMarkingStats
} from '../../../types';

import displayBoolean from './display-boolean';
import displayPercentage from './display-percentage';
import displaySize from './display-size';
import displayCoords from './display-coords';
import displayCoordsAndIndex from './display-coords-and-index';

export default function getStatsDisplayHtml<T = unknown>(stats: IMarkingStats<T>, cause?: EMarkingStatsChangeCause): string {
  return `<ul>${[
    ['Cause', cause || ''],
    ['TimeStamp', Date.now()],
    // 大小
    ['Zoom', displayPercentage(stats.zoom)],
    ['StageSize', displaySize(stats.stageSize)],
    ['CanvasSize', displaySize(stats.canvasSize)],
    ['CanvasCoords', displayCoords(stats.canvasCoords)],
    ['Image', stats.imageStatus],
    [' ├ Size', displaySize(stats.imageSize)],
    [' ├ Scale', displayPercentage(stats.imageScale)],
    [' ├ Mouse', displayCoords(stats.imageMouse)],
    [' └ MouseJustified', stats.imageMouseJustified],
    // 鼠标状态
    ['Mouse (InStage)', displayCoords(stats.mouseInStage)],
    [' ├ InCanvas', displayCoords(stats.mouseInCanvas)],
    [' ├ DownCanvas', displayBoolean(stats.mouseDownCanvas)],
    [' └ DownMoving', displayBoolean(stats.mouseDownMoving)],
    // 移动
    ['Move', displayBoolean(stats.moving)],
    [' ├ CoordsStart', displayCoords(stats.movingCoordsStart)],
    [' └ Coords', displayCoords(stats.movingCoords)],
    // 与 MarkingItem 有关的状态
    ['Create', displayBoolean(stats.creating)],
    [' ├ Started', displayBoolean(stats.creatingStarted)],
    [' ├ Crossing', displayBoolean(stats.creatingCrossing)],
    [' └ WillFinish', stats.creatingWillFinish],
    // Hover
    ['Hover', displayBoolean(stats.hovering)],
    [' ├ Point', displayCoordsAndIndex(stats.hoveringPoint, stats.hoveringPointIndex)],
    [' ├ InsertionPoint', stats.hoveringInsertionPointIndex],
    [' └ Border', stats.hoveringBorderIndex],
    // 编辑
    ['Edit', displayBoolean(stats.editing)],
    [' ├ PathLength', stats.editingPathLength],
    [' ├ Dirty', displayBoolean(stats.editingDirty)],
    [' ├ Crossing', displayBoolean(stats.editingCrossing)],
    [' ├ Hovering', displayBoolean(stats.editingHovering)],
    [' ├ HoveringPoint', stats.editingHoveringPointIndex],
    [' ├ HoveringInsertionPoint', stats.editingHoveringInsertionPointIndex],
    [' ├ HoveringBorder', stats.editingHoveringBorderIndex],
    [' ├ Dragging', displayBoolean(stats.editingDragging)],
    [' ├ DraggingPoint', stats.editingDraggingPointIndex],
    [' └ DraggingInsertionPoint', stats.editingDraggingInsertionPointIndex],
    ['Highlight', displayBoolean(stats.highlighting)],
    // 数据
    ['MarkingItems', stats.itemStatsList.length]
  ].map(v => {
    return `<li><span class="label">${v[0]}</span><span>${v[1]}</span></li>`;
  }).join('')}</ul>`;
}
