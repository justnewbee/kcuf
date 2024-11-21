import {
  MarkingItemStats
} from '@kcuf/canvas-marking-react-headless';

export default function getHoveringInfo(itemStats: MarkingItemStats): string {
  return itemStats.path.length > 2 ? `面积：${itemStats.area} (${itemStats.areaPercentage}%)` : `长度：${itemStats.length}`;
}
