import {
  MarkingConfigItem,
  MarkingZoomOptions,
  MarkingTooltipOptions
} from '@kcuf/canvas-marking';

export interface IModelProps<T = unknown> {
  className?: string; // 有限的样式自定义
  imageUrl: string;
  markingItems?: MarkingConfigItem<T>[];
  disabled?: boolean;
  zoomOptions?: MarkingZoomOptions; // TODO 这两个暂时没有更新
  tooltipOptions?: MarkingTooltipOptions<T>; // TODO 这两个暂时没有更新
  // 插件开关，除了说明的默认开
  plugins: {
    cursor?: boolean;
    tooltip?: boolean;
    magnet?: boolean;
    snapping?: boolean;
    zoom?: boolean;
    move?: boolean;
    stats?: boolean; // 默认 false
    fps?: boolean; // 默认 false
  };
}
