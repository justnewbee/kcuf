import {
  IModelProps
} from '../types';

import useModelContext from './_use-model-context';

/**
 * 返回填充默认值并合并 propsUpdate 的 props
 */
export default function useModelProps(): IModelProps {
  return useModelContext().props;
}
