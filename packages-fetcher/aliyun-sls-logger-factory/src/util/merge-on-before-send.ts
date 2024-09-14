import type {
  TFnOnBeforeSend,
  ISlsFactoryOptions
} from '../types';

export default function mergeOnBeforeSend(factoryOnBeforeSend?: TFnOnBeforeSend, onBeforeSend?: TFnOnBeforeSend): TFnOnBeforeSend | undefined {
  if (!factoryOnBeforeSend || !onBeforeSend) {
    return onBeforeSend || factoryOnBeforeSend;
  }
  
  return (options: ISlsFactoryOptions): boolean | void => {
    if (factoryOnBeforeSend(options) === false) {
      return false;
    }
    
    return onBeforeSend(options);
  };
}