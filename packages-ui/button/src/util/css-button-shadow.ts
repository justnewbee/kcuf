import {
  RuleSet
} from 'styled-components';

import {
  IScButtonProps
} from '../types';

export default function cssButtonShadow(props: IScButtonProps): RuleSet | null {
  if (props.disabled || props['data-loading'] !== undefined || props.$active) {
    return null;
  }
  
  return null;
}
