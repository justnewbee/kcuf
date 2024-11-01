import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  IBackdropGlobal,
  IBackdropWindow
} from '../types';

export default function singletonGlobal(): IBackdropGlobal {
  const win = getWindow<IBackdropWindow>();
  
  win.__backdrop_singleton__ ||= {};
  
  return win.__backdrop_singleton__;
}