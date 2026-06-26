import {
  TMergingGlobal
} from '../types';

interface IGlobalThis {
  __fetcher_merging__?: TMergingGlobal;
}

export default function mergingGlobal(): TMergingGlobal {
  let merging = (globalThis as IGlobalThis).__fetcher_merging__;
  
  if (!merging) {
    merging = {};
    
    (globalThis as IGlobalThis).__fetcher_merging__ = merging;
  }
  
  return merging;
}
