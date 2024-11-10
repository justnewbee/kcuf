import {
  EButtonPreset,
  IModelProps
} from '../../model';

const THEMES_TEXT_ALIGN_LEFT: EButtonPreset[] = [
  EButtonPreset.MENU
];

export default function getStyleTextAlign(props: Partial<IModelProps>): string {
  if (props.textAlign) {
    return props.textAlign;
  }
  
  if (props.preset && THEMES_TEXT_ALIGN_LEFT.includes(props.preset)) {
    return 'left';
  }
  
  return 'center';
}
