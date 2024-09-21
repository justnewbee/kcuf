import {
  ISlsLogFn,
  ISlsLogFnQuick,
  ISlsLogOptions,
  TLogQuickArgs
} from '../types';

export default function createSlsLogQuick(sls: ISlsLogFn, group: string): ISlsLogFnQuick {
  return (...args: TLogQuickArgs): void => {
    let options: ISlsLogOptions = {};
    let topic: string;
    let payload: object | undefined;
    
    if (typeof args[0] === 'string') {
      [topic, payload] = args as [string, object?];
    } else {
      [options, topic, payload] = args as [ISlsLogOptions, string, object?];
    }
    
    sls({
      ...options,
      group
    }, topic, payload as object);
  };
}