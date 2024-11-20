import {
  ReactElement
} from 'react';

import {
  IControllableChecked
} from '../../../types';

export interface IInputRadioProps extends IControllableChecked {
  label?: string | ReactElement;
}
