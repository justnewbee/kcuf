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
    ['Zoom', displayPercentage(stats.zoom)],
    ['StageCoords', displayCoords(stats.stageRect.coords)],
    ['StageSize', displaySize(stats.stageRect.size)],
    ['CanvasCoords', displayCoords(stats.canvasRect.coords)],
    ['CanvasSize', displaySize(stats.canvasRect.size)],
    ['Image', stats.imageStatus],
    [' ├ Size', displaySize(stats.imageSize)],
    [' └ Scale', displayPercentage(stats.imageScale)],
    ['Mouse', displayCoords(stats.mouse)],
    [' ├ InStage', displayCoords(stats.mouseInStage)],
    [' ├ InCanvasUnprotected', displayCoords(stats.mouseInCanvasUnprotected)],
    [' ├ InCanvas', displayCoords(stats.mouseInCanvas)],
    [' ├ InImage', displayCoords(stats.mouseInImage)],
    [' ├ InImageJustified', stats.mouseInImageJustified],
    [' ├ DownCanvas', displayBoolean(stats.mouseDownCanvas)],
    [' └ DownMoving', displayBoolean(stats.mouseDownMoving)],
    ['Moving', displayBoolean(stats.moving)],
    [' ├ CoordsStart', displayCoords(stats.movingCoordsStart)],
    [' └ Coords', displayCoords(stats.movingCoords)],
    ['Creating', displayBoolean(stats.creating)],
    [' ├ Started', displayBoolean(stats.creatingStarted)],
    [' ├ Crossing', displayBoolean(stats.creatingCrossing)],
    [' └ WillFinish', stats.creatingWillFinish],
    ['Editing', displayBoolean(stats.editing)],
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
    ['Hovering', displayBoolean(stats.hovering)],
    [' ├ Point', displayCoordsAndIndex(stats.hoveringPoint, stats.hoveringPointIndex)],
    [' ├ InsertionPoint', stats.hoveringInsertionPointIndex],
    [' └ Border', stats.hoveringBorderIndex],
    ['Highlighting', displayBoolean(stats.highlighting)],
    ['MarkingItems', stats.itemStatsList.length]
  ].map(v => {
    return `<li><span class="label">${v[0]}</span><span>${v[1]}</span></li>`;
  }).join('')}</ul>`;
}
