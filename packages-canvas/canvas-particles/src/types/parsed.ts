import {
  EParticleShape
} from '../enum';

import {
  TNonEmptyArray,
  TConfigColor,
  TRange,
  IConfigImage,
  IConfigStroke,
  IConfigLink,
  IConfigAttract,
  IConfigAnimateRadius,
  IConfigAnimateMove,
  IConfigAnimateOpacity,
  IConfigClickBubble,
  IConfigHoverBubble,
  IConfigClickRepulse
} from './common';

export type TParsedConfigShape = TNonEmptyArray<EParticleShape>;

export interface IParsedConfigAnimateRadius extends Required<IConfigAnimateRadius> {}

export interface IParsedConfigAnimateMove extends Required<IConfigAnimateMove> {}

export interface IParsedConfigAnimateOpacity extends Required<IConfigAnimateOpacity> {}

export interface IParsedConfigHoverBubble extends Required<IConfigHoverBubble> {}

export interface IParsedConfigClickBubble extends Required<IConfigClickBubble> {}

export interface IParsedConfigLink extends Required<IConfigLink> {}

export interface IParsedConfigClickRepulse extends Required<IConfigClickRepulse> {}

/**
 * 由比较自由的 IParticlesConfig 解析而成，简化后期的计算逻辑
 */
export interface IParticlesParsedConfig {
  eventOnWindow?: boolean;
  count: number;
  density: boolean;
  shape: TParsedConfigShape;
  image: IConfigImage | null;
  color?: TConfigColor;
  stroke?: IConfigStroke;
  opacity: TRange;
  radius: TRange;
  link: IParsedConfigLink | null;
  attract: IConfigAttract | null;
  animateRadius: IParsedConfigAnimateRadius | null;
  animateOpacity: IParsedConfigAnimateOpacity | null;
  animateMove: IParsedConfigAnimateMove | null;
  hoverLink: IParsedConfigLink | null;
  hoverRepulse: number;
  hoverBubble: IParsedConfigHoverBubble | null;
  clickRemove: number;
  clickGenerate: number;
  clickRepulse: IParsedConfigClickRepulse | null;
  clickBubble?: IParsedConfigClickBubble | null;
}
