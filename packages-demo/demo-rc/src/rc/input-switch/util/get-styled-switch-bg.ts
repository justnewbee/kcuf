import {
  RuleSet,
  css
} from 'styled-components';

interface IScProps {
  'aria-checked': boolean;
  disabled?: boolean;
}

export default function getStyledSwitchBg(props: IScProps): RuleSet {
  if (props.disabled) {
    return css`
      background-color: hsl(0 0% 80%);
    `;
  }
  
  return props['aria-checked'] ? css`
    background-color: hsl(120 100% 30%);
  ` : css`
    background-color: hsl(210 50% 40%);
  `;
}