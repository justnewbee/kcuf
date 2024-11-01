import {
  FlattenSimpleInterpolation
} from 'styled-components';

import {
  mixinShadowMDown
} from '@alicloud/console-base-theme';
import {
  IPropsScInput
} from '@kcuf/rc-headless-input-text';

export default function getStyledShadow(props: IPropsScInput): FlattenSimpleInterpolation | null {
  return !props.disabled && !props.borderless && (props.focused || props.hovered) ? mixinShadowMDown : null;
}
