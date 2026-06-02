import {
  parseUa
} from './util';

export default parseUa(navigator.userAgent);

export {
  parseUa
};

export {
  EUaOs as UaOs,
  EUaBrowser as UaBrowser
} from './enum';

export type {
  IUa as Ua
} from './types';
