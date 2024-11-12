import {
  EParticleShape
} from '../enum';

export type TNonEmptyArray<T> = [T, ...T[]];

export type TCoords = [number, number];
export type TRange = [number, number];

export type TNumberOrRange = number | TRange;

export type TColorValue = 'random' | 'all' | `#${string}`;

export type TShape = EParticleShape | `${EParticleShape}`;

export type TConfigShape = 'random' | TShape | TShape[];
export type TConfigColor = TColorValue | TColorValue[];

export interface IConfigStroke {
  color: TConfigColor;
  width?: number;
}

export interface IConfigImage {
  src: string;
  aspectRatio?: number;
}

export type TConfigImage = string | IConfigImage;

export interface IConfigAnimateSpeedBase {
  /**
   * 每 100 帧的变化量
   */
  speed?: number;
  /**
   * 增加速度随机性，将对速度乘以 0.3-1 之间的随机数
   */
  speedSync?: boolean;
}

export interface IConfigAnimateRadius extends IConfigAnimateSpeedBase {}

/**
 * 不透明度动画配置
 */
export interface IConfigAnimateOpacity extends IConfigAnimateSpeedBase {}

export interface IConfigAnimateMove extends IConfigAnimateSpeedBase {
  /**
   * 运动方向角度，默认 random，表示与 x 轴的「顺时针」角度（因为浏览器的 y 轴跟数学是相反的）
   *
   * 注意，指定角度后，默认会有一定的方向抖动（但速度是相等）
   */
  angle?: 'random' | number;
  /**
   * 解除运动方向抖动，让所有粒子朝一个相同的方向运行
   */
  straight?: boolean;
  /**
   * 互碰回弹
   */
  bounce?: boolean;
  /**
   * 边缘回弹
   */
  bounceOnEdge?: boolean;
}

export interface IConfigBubbleBase {
  distance?: number;
  diffRadius?: number;
  diffOpacity?: number;
}

export interface IConfigHoverBubble extends IConfigBubbleBase {}

export interface IConfigClickBubble extends IConfigBubbleBase {
  speed?: number;
  duration?: number;
}

export interface IConfigLink {
  /**
   * 最大连线距离，超过此设置，不连线
   */
  distance: number;
  /**
   * 连线粗细大小，默认 1
   */
  width?: number;
  /**
   * 连线的颜色
   */
  color?: TConfigColor;
  /**
   * 连线的最大 opacity，默认为粒子的最大 opacity，距离越大，实际的 opacity 越小，直到消失
   */
  opacity?: number;
}

export type TConfigLink = boolean | null | number | IConfigLink;

export interface IConfigAttract {
  distance: number;
  rotateX: number;
  rotateY: number;
}

export interface IConfigClickRepulse {
  radius?: number;
  duration?: number;
}

export interface ICreateInfo {
  image: HTMLImageElement | null;
  imageAspectRatio: number;
  canvasWidth: number;
  canvasHeight: number;
  coords?: TCoords;
}

export interface IUpdateInfo {
  canvasWidth: number;
  canvasHeight: number;
  coordsHover: TCoords | null;
  coordsClick: TCoords | null;
  /**
   * 距离上次鼠标点击的时间
   */
  timeFromLastClick: number;
}
