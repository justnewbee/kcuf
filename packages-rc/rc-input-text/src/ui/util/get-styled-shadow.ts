import {
  RuleSet
} from 'styled-components';

import {
  mixinShadowMDown
} from '@kcuf/fork-console-base-theme';
import {
  InputTextProps
} from '@kcuf/rc-input-text-headless';

export default function getStyledShadow(props: InputTextProps): RuleSet | null {
  return !props.disabled && !props.borderless && (props.focused || props.hovered) ? mixinShadowMDown : null;
}
