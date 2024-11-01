import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  TMergingGlobal,
  IMergingWindow
} from '../types';

export default function mergingGlobal(): TMergingGlobal {
  const win = getWindow<IMergingWindow>();
  
  win.__fetcher_merging__ ||= {};
  
  return win.__fetcher_merging__;
}
