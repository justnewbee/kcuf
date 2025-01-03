import {
  ReactElement
} from 'react';

import {
  ETransactionMode
} from '../enum';

export interface ITransitionSwitchProps {
  /**
   * Transition modes.
   * `out-in`: Current element transitions out first, then when complete, the new element transitions in.
   * `in-out`: New element transitions in first, then when complete, the current element transitions out.
   */
  mode?: `${ETransactionMode}` | undefined;
  
  /**
   * Any `Transition` or `CSSTransition` component
   */
  children: ReactElement;
}
