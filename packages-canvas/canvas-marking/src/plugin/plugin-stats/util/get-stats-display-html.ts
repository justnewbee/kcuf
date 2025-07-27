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
  const {
    imageInfo,
    mouseInfo,
    movingInfo
  } = stats;
  
  return `<ul>${[
    ['Cause', cause ?? ''],
    ['TimeStamp', Date.now()],
    ['Zoom', displayPercentage(stats.zoom)],
    ['StageCoords', displayCoords(stats.stageRect.coords)],
    ['StageSize', displaySize(stats.stageRect.size)],
    ['CanvasCoords', displayCoords(stats.canvasRect.coords)],
    ['CanvasSize', displaySize(stats.canvasRect.size)],
    ['Image', imageInfo.status],
    [' ├ Size', displaySize(imageInfo.size)],
    [' └ Scale', displayPercentage(imageInfo.scale)],
    ['Mouse', displayCoords(mouseInfo.coordsRelativeToStage)],
    [' ├ InStage', displayCoords(mouseInfo.coordsInStage)],
    [' ├ RelativeToCanvas', displayCoords(mouseInfo.coordsRelativeToCanvas)],
    [' ├ InCanvas', displayCoords(mouseInfo.coordsInCanvas)],
    [' ├ RelativeToImage', displayCoords(mouseInfo.coordsRelativeToImage)],
    [' ├ InImage', displayCoords(mouseInfo.coordsInImage)],
    [' ├ InImageJustified', mouseInfo.coordsInImageJustified],
    [' ├ DownCanvas', displayBoolean(mouseInfo.downCanvas)],
    [' └ DownMoving', displayBoolean(mouseInfo.downMoving)],
    ['Moving', displayBoolean(movingInfo.started)],
    [' ├ CoordsStart', displayCoords(movingInfo.coordsStart)],
    [' └ Coords', displayCoords(movingInfo.coords)],
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
    return `<li><span class="label">${v[0] as string}</span><span>${v[1] as string}</span></li>`;
  }).join('')}</ul>`;
}
