import type {
  TFlattenPathTester
} from '../types';

export default function flattenTestPath(path: string, tester: TFlattenPathTester): boolean {
  return (Array.isArray(tester) ? tester : [tester]).some(v => {
    return typeof v === 'string' ? v === path : v.test(path);
  });
}
