import {
  TEditable
} from '../../../types';

export default function displayEditable(value: TEditable): string {
  if (value === 'locked') {
    return '🔒';
  }
  
  return value ? '✅' : '❌';
}
