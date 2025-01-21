import {
  ButtonProps
} from '@kcuf-ui/rc-button-headless';

export interface IScButtonProps {
  $preset?: ButtonProps['preset'];
  $size?: ButtonProps['size'];
  $noShadow?: ButtonProps['noShadow'];
  $textAlign?: ButtonProps['textAlign'];
  $borderRadius?: ButtonProps['borderRadius'];
  $active?: ButtonProps['active'];
  disabled?: boolean;
  'data-button-loading'?: '';
}
