import {
  IScButtonProps
} from '../types';

export default function getStyleTextAlign(props: IScButtonProps): string {
  if (props.$textAlign) {
    return props.$textAlign;
  }
  
  return 'center';
}
