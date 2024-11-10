import {
  EButtonPreset
} from '../../model';
import {
  IScButtonProps
} from '../types';

const THEMES_BLOCK: EButtonPreset[] = [
  EButtonPreset.MENU
];

export default function isBlock(props: IScButtonProps): boolean | undefined {
  return (props.$preset && THEMES_BLOCK.includes(props.$preset)) || props.$block;
}
