import {
  RuleSet
} from 'styled-components';

import {
  mixinShadowMDown
} from '@kcuf/fork-console-base-theme';

import {
  IScInputProps
} from '../types';

export default function getStyledShadow(props: IScInputProps): RuleSet | null {
  return !props.disabled && !props.$borderless && props.$focused/*  || props.hovered */ ? mixinShadowMDown : null;
}
