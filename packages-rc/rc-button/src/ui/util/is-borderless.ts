import {
  EButtonPreset,
  EButtonSize
} from '../../model';
import {
  IScButtonProps
} from '../types';

const THEMES_NEED_BORDER: EButtonPreset[] = [
  EButtonPreset.DANGER,
  EButtonPreset.PRIMARY,
  EButtonPreset.SECONDARY,
  EButtonPreset.SECONDARY_ALT,
  EButtonPreset.TERTIARY,
  EButtonPreset.TERTIARY_ALT,
  EButtonPreset.BRAND_PRIMARY,
  EButtonPreset.BRAND_SECONDARY,
  EButtonPreset.BRAND_SECONDARY_ALT,
  EButtonPreset.BRAND_TERTIARY
];

export default function isBorderless(props: IScButtonProps): boolean {
  return props.$size === EButtonSize.NONE || (props.$preset ? !THEMES_NEED_BORDER.includes(props.$preset as EButtonPreset) : true);
}
