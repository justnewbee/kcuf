import {
  IPropsDom
} from '../types';

import usePropsCustomAndDom from './use-props-custom-and-dom';

export default function usePropsDom(): IPropsDom {
  return usePropsCustomAndDom()[1];
}
