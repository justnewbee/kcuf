import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  MESSAGE_SOURCE
} from '../const';
import {
  IMessageData
} from '../types';

export default function messageListen<T = void>(type: string, listener: (payload?: T) => void): () => void {
  const win = getWindow();
  
  function handleMessage(e: MessageEvent<IMessageData<T> | null>): void {
    if (!e.data || e.data.source !== MESSAGE_SOURCE || e.data.type !== type) {
      return;
    }
    
    listener(e.data.payload);
  }
  
  win.addEventListener('message', handleMessage);
  
  return () => win.removeEventListener('message', handleMessage);
}