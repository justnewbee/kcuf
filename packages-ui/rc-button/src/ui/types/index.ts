import {
  ButtonProps
} from '@kcuf-ui/rc-button-headless';

export interface IScButtonProps {
  $preset?: ButtonProps['preset'];
  $size?: ButtonProps['size'];
  $loading?: ButtonProps['loading'];
  $noShadow?: ButtonProps['noShadow'];
  $textAlign?: ButtonProps['textAlign'];
  $cursor?: ButtonProps['cursor'];
  $borderRadius?: ButtonProps['borderRadius'];
  $fluid?: ButtonProps['fluid'];
  $active?: ButtonProps['active'];
  disabled?: boolean;
}
