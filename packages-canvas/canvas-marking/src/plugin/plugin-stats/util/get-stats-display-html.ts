import {
  EMarkingStatsChangeCause
} from '../../../enum';
import {
  IMarkingStageStats
} from '../../../types';

import displayBoolean from './display-boolean';
import displayPercentage from './display-percentage';
import displaySize from './display-size';
import displayCoords from './display-coords';
import displayCoordsAndIndex from './display-coords-and-index';

export default function getStatsDisplayHtml<T>(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): string {
  return `<ul>${[
    ['Cause', cause],
    ['TimeStamp', Date.now()],
    // 禁用
    ['Disabled', displayBoolean(stats.disabled)],
    // 大小
    ['Zoom', displayPercentage(stats.zoom)],
    ['StageSize', displaySize(stats.stageSize)],
    ['CanvasSize', displaySize(stats.canvasSize)],
    ['CanvasCoords', displayCoords(stats.canvasCoords)],
    ['ImageStatus', stats.imageStatus],
    ['ImageSize', displaySize(stats.imageSize)],
    ['ImageScale', displayPercentage(stats.imageScale)],
    ['ImageMouse', displayCoords(stats.imageMouse)],
    ['ImageMouseJustified', stats.imageMouseJustified],
    // 鼠标状态
    ['MouseInStage', displayCoords(stats.mouseInStage)],
    ['MouseInCanvas', displayCoords(stats.mouseInCanvas)],
    ['MouseDownCanvas', displayBoolean(stats.mouseDownCanvas)],
    ['MouseDownMoving', displayBoolean(stats.mouseDownMoving)],
    // 移动
    ['Moving', displayBoolean(stats.moving)],
    ['MovingCoordsStart', displayCoords(stats.movingCoordsStart)],
    ['MovingCoords', displayCoords(stats.movingCoords)],
    // 与 MarkingItem 有关的状态
    ['Creating', displayBoolean(stats.creating)],
    ['CreatingStarted', displayBoolean(stats.creatingStarted)],
    ['CreatingCrossing', displayBoolean(stats.creatingCrossing)],
    ['CreatingWillFinish', stats.creatingWillFinish],
    ['Highlighting', displayBoolean(stats.highlighting)],
    // Hover
    ['Hovering', displayBoolean(stats.hovering)],
    ['HoveringPoint', displayCoordsAndIndex(stats.hoveringPoint, stats.hoveringPointIndex)],
    ['HoveringInsertionPoint', stats.hoveringInsertionPointIndex],
    ['HoveringBorder', stats.hoveringBorderIndex],
    // 编辑
    ['Editing', displayBoolean(stats.editing)],
    ['EditingDirty', displayBoolean(stats.editingDirty)],
    ['EditingCrossing', displayBoolean(stats.editingCrossing)],
    ['EditingHovering', displayBoolean(stats.editingHovering)],
    ['EditingHoveringPoint', stats.editingHoveringPointIndex],
    ['EditingHoveringInsertionPoint', stats.editingHoveringInsertionPointIndex],
    ['EditingHoveringBorder', stats.editingHoveringBorderIndex],
    ['EditingDragging', displayBoolean(stats.editingDragging)],
    ['EditingDraggingPoint', stats.editingDraggingPointIndex],
    ['EditingDraggingInsertionPoint', stats.editingDraggingInsertionPointIndex],
    // 数据
    ['MarkingItems', stats.itemStatsList.length]
  ].map(v => {
    return `<li><span class="label">${v[0]}</span><span>${v[1]}</span></li>`;
  }).join('')}</ul>`;
}
