import {
  useCallback
} from 'react';

import useCodes from './use-codes';

export default function useIsKeyActive(): (code: string) => boolean {
  const codes = useCodes();
  
  return useCallback((code: string): boolean => codes.includes(code), [codes]);
}