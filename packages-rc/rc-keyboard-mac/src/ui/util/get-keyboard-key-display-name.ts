import {
  KeyData
} from '@kcuf/rc-headless-keyboard-mac';

export default function getKeyboardKeyDisplayName(data: KeyData): string | [string, string] {
  if (data.name) {
    return data.name;
  }
  
  const name = data.key || data.code;
  const nameShift = data.keyShift;
  
  return nameShift ? [nameShift, name] : name;
}
