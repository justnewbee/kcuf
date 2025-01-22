import {
  ButtonProps
} from '@kcuf-ui/rc-button-headless';

export interface IScButtonProps {
  $preset?: ButtonProps['preset'];
  $size?: ButtonProps['size'];
  $textAlign?: ButtonProps['textAlign'];
  $active?: ButtonProps['active'];
  disabled?: boolean;
  'data-loading'?: '';
}
