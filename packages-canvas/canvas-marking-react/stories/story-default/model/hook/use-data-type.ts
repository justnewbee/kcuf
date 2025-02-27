import {
  EDataType
} from '../enum';

import useModelState from './_use-model-state';

export default function useDataType(): EDataType {
  return useModelState().dataType;
}
