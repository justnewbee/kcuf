import {
  TDontSend
} from '../types';

export default function mergeDontSend(factoryDontSend?: TDontSend, dontSend?: TDontSend): TDontSend | undefined {
  if (!factoryDontSend || !dontSend) {
    return dontSend || factoryDontSend;
  }
  
  return (): boolean | undefined => factoryDontSend() || dontSend();
}
