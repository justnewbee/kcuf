import {
  IButtonPropsCustom
} from '../types';

import useModelProps from './_use-model-props';

export default function usePropsCustom(): IButtonPropsCustom {
  return useModelProps()[0];
}
