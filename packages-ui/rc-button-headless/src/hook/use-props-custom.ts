import {
  IButtonPropsCustom
} from '../types';

import usePropsCustomAndDom from './use-props-custom-and-dom';

export default function usePropsCustom(): IButtonPropsCustom {
  return usePropsCustomAndDom()[0];
}
