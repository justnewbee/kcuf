import {
  IErrorCaught,
  IErrorStackItem
} from '../types';

import getErrorStack from './get-error-stack';

const REG_TEST_CHROME_IE = /^\s*at ([^(]+) \([^)]+\)/m;
const REG_EXTRACTOR_CHROME_IE = /^at ([^(]+) \(([^)]+)\)$/; // full-match + name + url

export default function getErrorStackItems(caught: IErrorCaught): IErrorStackItem[] {
  const stack = getErrorStack(caught);
  
  if (!stack) {
    return [];
  }
  
  const chromeOrIeStack = REG_TEST_CHROME_IE.test(stack);
  
  return stack.split('\n').reduce((result: IErrorStackItem[], v) => {
    const line = v.trim();
    let name = '';
    let url = '';
    
    if (chromeOrIeStack) {
      const arr = REG_EXTRACTOR_CHROME_IE.exec(line) as [string, string, string] | null;
      
      if (arr) {
        [, name, url] = arr;
      }
    } else {
      const indexOfAt = line.indexOf('@http');
      
      if (indexOfAt >= 0) {
        name = line.substring(0, indexOfAt);
        url = line.substring(indexOfAt + 1);
      }
    }
    
    if (name || url) {
      result.push({
        name,
        url
      });
    }
    
    return result;
  }, []);
}
