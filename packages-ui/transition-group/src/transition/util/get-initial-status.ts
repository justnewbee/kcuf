import {
  ETransactionStatus
} from '../enum';
import {
  IModelProps
} from '../types';

export default function getInitialStatus(props: IModelProps): ETransactionStatus {
  const {
    in: inProp,
    appear,
    mountOnEnter,
    unmountOnExit
  } = props;
  
  if (inProp) {
    if (appear) {
      return ETransactionStatus.EXITED;
    }
    
    return ETransactionStatus.ENTERED;
  }
  
  if (unmountOnExit || mountOnEnter) {
    return ETransactionStatus.UNMOUNTED;
  }
  
  return ETransactionStatus.EXITED;
}
