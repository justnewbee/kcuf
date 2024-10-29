import {
  IKeyData
} from '../types';

export default function getKeyboardKeyDisplayName(data: IKeyData): string | [string, string] {
  if (data.name) {
    return data.name;
  }
  
  const name = data.key || data.code;
  const nameShift = data.keyShift;
  
  return nameShift ? [nameShift, name] : name;
}