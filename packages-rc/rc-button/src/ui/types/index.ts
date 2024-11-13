import {
  IModelProps
} from '../../model';

export interface IScButtonProps {
  $preset?: IModelProps['preset'];
  $size?: IModelProps['size'];
  $loading?: IModelProps['loading'];
  $noShadow?: IModelProps['noShadow'];
  $textAlign?: IModelProps['textAlign'];
  $cursor?: IModelProps['cursor'];
  $borderRadius?: IModelProps['borderRadius'];
  $block?: IModelProps['block'];
  $active?: IModelProps['active'];
  disabled?: boolean;
}
