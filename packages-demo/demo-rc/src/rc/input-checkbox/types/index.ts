import {
  ReactElement
} from 'react';

import {
  IControllableChecked
} from '../../../types';

export interface IInputCheckboxProps extends IControllableChecked {
  label?: string | ReactElement;
}
