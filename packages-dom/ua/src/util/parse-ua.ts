import {
  IUa
} from '../types';

import parseUaOs from './parse-ua-os';
import parseUaBrowser from './parse-ua-browser';

export default function parseUa(ua: string): IUa {
  const [OS, OS_VERSION] = parseUaOs(ua);
  const [BROWSER, BROWSER_VERSION] = parseUaBrowser(ua);
  
  return {
    OS,
    OS_VERSION,
    BROWSER,
    BROWSER_VERSION
  };
}
