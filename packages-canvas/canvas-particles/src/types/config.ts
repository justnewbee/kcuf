import {
  TNumberOrRange,
  TConfigShape,
  TConfigImage,
  TConfigColor,
  TConfigLink,
  IConfigStroke,
  IConfigAnimateRadius,
  IConfigAnimateOpacity,
  IConfigAnimateMove,
  IConfigAttract,
  IConfigHoverBubble,
  IConfigClickRepulse,
  IConfigClickBubble
} from './common';

export interface IParticlesConfig {
  eventOnWindow?: boolean;
  // -------- 粒子数量 -------- //
  /**
   * 在画布上渲染多少个粒子
   */
  count?: number;
  /**
   * 是否启用密度模式
   *
   * - true，count 分布在每 500x500 平方像素（即相对数量）
   * - false，count 分布在整个画布（即绝对数量）
   */
  density?: boolean;
  // -------- 粒子长相 -------- //
  /**
   * 粒子形状
   *
   * - 若为 random 则生成粒子时，从除了 IMAGE 中的可选位置随机取一个
   * - 若为图片，则必须提供对应图片，否则将降级为 SQUARE
   */
  shape?: TConfigShape;
  /**
   * 当 shape 为图片时，若为字符串，则表示图片 URL，若为对象，则可以通过 aspectRatio 设置宽高比
   *
   * 注意：非 SVG 的宽高比一般可以通过程序得出，但 SVG 需要自行设定（默认为 1）
   */
  image?: TConfigImage;
  /**
   * 粒子颜色设置，不设置则为 random
   */
  color?: TConfigColor;
  /**
   * 描边 TODO opacity and more simplicity
   */
  stroke?: IConfigStroke;
  /**
   * 粒子生成时的不透明度，若为范围，则在范围内随机，范围 [0, 100]，默认 [10, 100]
   */
  opacity?: TNumberOrRange;
  /**
   * 粒子生成时的半径，若为范围，则在范围内随机
   */
  radius?: TNumberOrRange;
  /**
   * 粒子间连线配置，若为数字则表示最大距离（其余默认）
   */
  link?: TConfigLink;
  // -------- 粒子动画 -------- //
  /**
   * 半径动画，需配置 radius 为范围，数值表示速度
   */
  animateRadius?: boolean | null | number | IConfigAnimateRadius;
  /**
   * 「不」透明度动画，需配置 opacity 为范围，数值表示速度
   */
  animateOpacity?: boolean | null | number | IConfigAnimateOpacity;
  /**
   * 位移动画，数值表示速度
   */
  animateMove?: boolean | null | number | IConfigAnimateMove;
  /**
   * 粒子间引力作用 TODO 解释 // TODO 碰撞
   */
  attract?: IConfigAttract;
  // -------- 交互 - Hover -------- //
  /**
   * 在鼠标悬停处启用「抓取」效果，其实也是连线，配置项类型和 link 一样（但默认值会有所区别）
   */
  hoverLink?: TConfigLink;
  /**
   * 在鼠标悬停处启用「反推」效果，将形成一个以鼠标为中心，该值为半径的空心
   */
  hoverRepulse?: boolean | null | number;
  /**
   * 在鼠标悬停处启用「气泡」效果
   */
  hoverBubble?: boolean | null | IConfigHoverBubble;
  // -------- 交互 - Click -------- //
  /**
   * 点击时，将移除多少个粒子
   */
  clickRemove?: number;
  /**
   * 点击处将生出多少个粒子
   */
  clickGenerate?: number;
  /**
   * 在点击处启用「反推」效果，形成短时间的空心
   */
  clickRepulse?: boolean | null | number | IConfigClickRepulse;
  /**
   * 在点击处启用「气泡」效果
   */
  clickBubble?: boolean | null | IConfigClickBubble;
}