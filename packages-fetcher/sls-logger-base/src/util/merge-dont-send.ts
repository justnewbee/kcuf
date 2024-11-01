import type {
  IDontSend
} from '../types';

export default function mergeDontSend(factoryDontSend?: IDontSend, dontSend?: IDontSend): IDontSend | undefined {
  if (!factoryDontSend || !dontSend) {
    return dontSend || factoryDontSend;
  }
  
  return (): boolean | void => factoryDontSend() || dontSend();
}