import Subscribable from '@kcuf/subscribable';
import {
  Point,
  Path
} from '@kcuf/geometry-basic';

import {
  TZoomArg,
  TMarkingItemFinder,
  IImageInfo,
  IMouseInfo
} from './common';
import {
  IMarkingStats
} from './stats';
import {
  IMarkingConfigItem,
  IMarkingItemConfig
} from './canvas-marking-item-class';
import {
  TSubscribableEvents
} from './events';
import {
  ICanvasMarkingOptions
} from './options';
import {
  IMarkingPlugin
} from './plugin';

/**
 * 共享给 MarkingItem 的属性，单独一个类型为避免 Item 越权操作
 */
export interface ICanvasMarkingClassProtected<T = unknown> {
  readonly options: ICanvasMarkingOptions<T>;
  readonly canvasContext: CanvasRenderingContext2D;
  
  imageInfo: IImageInfo;
  mouseInfo: IMouseInfo;
  statsSnapshot: IMarkingStats<T>;
}

/**
 * CanvasMarking 需实现的接口
 */
export interface ICanvasMarkingClass<T = unknown> extends ICanvasMarkingClassProtected<T>, Subscribable<TSubscribableEvents<T>> {
  readonly stage: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  
  /**
   * 设置图片（用空串可清空）和数据，将重绘
   */
  setData(image: string, markings?: IMarkingConfigItem<T>[]): void;
  
  /**
   * 更新配置项（除 `image`、`markings` 外）
   */
  updateOptions(updates: Partial<ICanvasMarkingOptions<T>>): void;
  
  /**
   * 注册插件，返回无参的解绑方法
   */
  registerPlugin(pluginRegister: (markingStage: ICanvasMarkingClass<T>) => IMarkingPlugin<T>): () => void;
  
  /**
   * 切换是否自动矫正（磁吸、正交）
   */
  toggleJustify(enabled?: boolean): void;
  
  /**
   * 切换是否 snap
   */
  toggleSnap(enabled?: boolean): void;
  
  /**
   * 开始新建
   */
  startCreating(config?: IMarkingItemConfig, initialPath?: Path): void;
  
  /**
   * 取消新建
   */
  cancelCreating(): void;
  
  /**
   * 完成新建（但不一定能完成），可能触发 `onEditCancel` 或 `onEditComplete`
   */
  finishCreating(): void;
  
  /**
   * 完成编辑（不一定能完成）
   */
  finishEditing(): void;
  
  /**
   * 选中或取消选中，会触发 `onSelectionChange`
   */
  select(finder: TMarkingItemFinder<T>, highlightToo?: boolean): void;
  
  /**
   * 高亮或取消高亮
   */
  highlight(finder: TMarkingItemFinder<T>, borderIndex?: number | null): void;
  
  /**
   * 删除激活的标记（可用于在新建后删除刚刚新建的那个）
   */
  deleteItemEditing(): boolean;
  
  /**
   * 清除所有标记（包括新建中的，如果有）
   */
  deleteItemsAll(): void;
  
  zoom(how: TZoomArg, aroundMouse?: boolean, wheelDelta?: number): void;
  
  /**
   * 开启移动（当鼠标在 stage 内时按下空格，并保持按住状态）
   */
  toggleMove(): void;
  moveReady(): void;
  moveStart(): void;
  moveProcess(): void;
  movePause(): void;
  moveEnd(): void;
  moveTo(coords: Point): void;
  moveBy(dx: number, dy: number): void;
  
  /**
   * 根据当前 stats 进行绘画，主要用于内部调用；但也可以由使用者按需主动调用，`drawExtra` 仅供外部调用，以于画一些额外的图形
   *
   * `drawExtra` 的 `scale` 参数主要用于画视觉等效的线
   */
  draw(drawExtra?: (canvasContext: CanvasRenderingContext2D, scale: number) => void): void;
  
  /**
   * 销毁
   */
  destroy(): void;
  
  /**
   * 主动获取当前状态，一般不需要主动调用，建议在 options.onStatsChange 监听
   */
  getStats(): IMarkingStats<T>;
}

export type TCanvasMarkingPluginRegister<T = unknown> = (markingStage: ICanvasMarkingClass<T>) => IMarkingPlugin<T>;
