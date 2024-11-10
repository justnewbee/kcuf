import {
  EButtonPreset
} from '../../model';
import {
  IScButtonProps
} from '../types';

const THEMES_TEXT_ALIGN_LEFT: EButtonPreset[] = [
  EButtonPreset.MENU
];

export default function getStyleTextAlign(props: IScButtonProps): string {
  if (props.$textAlign) {
    return props.$textAlign;
  }
  
  if (props.$preset && THEMES_TEXT_ALIGN_LEFT.includes(props.$preset as EButtonPreset)) {
    return 'left';
  }
  
  return 'center';
}
