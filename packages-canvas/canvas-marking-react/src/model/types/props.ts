import {
  MarkingConfigItem
} from '@kcuf/canvas-marking';

export interface IModelProps {
  className?: string; // 有限的样式自定义
  imageUrl: string;
  markingItems?: MarkingConfigItem[];
  disabled?: boolean;
}
