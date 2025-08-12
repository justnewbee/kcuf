import {
  ReactElement
} from 'react';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useDialogTitleExtra(): string | ReactElement | undefined {
  const {
    titleExtra
  } = useModelProps();
  const {
    data
  } = useModelState();
  
  return typeof titleExtra === 'function' ? titleExtra(data) : titleExtra;
}
