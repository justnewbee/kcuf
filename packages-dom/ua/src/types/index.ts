import {
  EUaBrowser,
  EUaOs
} from '../enum';

export interface IUa {
  OS: EUaOs;
  OS_VERSION: string;
  BROWSER: EUaBrowser;
  BROWSER_VERSION: string;
}
