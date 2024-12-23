import {
  KeyData
} from '@kcuf-ui/rc-keyboard-mac-headless';

export default function getKeyboardKeyDisplayName(data: KeyData): string | [string, string] {
  if (data.name) {
    return data.name;
  }
  
  const name = data.key || data.code;
  const nameShift = data.keyShift;
  
  return nameShift ? [nameShift, name] : name;
}
