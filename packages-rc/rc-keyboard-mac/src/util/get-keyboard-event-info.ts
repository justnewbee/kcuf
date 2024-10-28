import {
  IModifier,
  IKeyboardInfo
} from '../types';

const modifierCtrl: IModifier = {
  codes: ['ControlLeft', 'ControlRight'],
  last: ''
};
const modifierAlt: IModifier = {
  codes: ['AltLeft', 'AltRight'],
  last: ''
};
const modifierShift: IModifier = {
  codes: ['ShiftLeft', 'ShiftRight'],
  last: ''
};
const modifierMeta: IModifier = {
  codes: ['MetaLeft', 'MetaRight'],
  last: ''
};

export default function getKeyboardEventInfo(e: KeyboardEvent): IKeyboardInfo {
  const codes: string[] = [];
  const {
    code
  } = e;
  
  if (code === 'Delete') {
    codes.push('Backspace');
    codes.push('TheFn');
  } else {
    codes.push(code);
  }
  
  if (modifierCtrl.codes.includes(code)) {
    modifierCtrl.last = code;
  }
  
  if (modifierAlt.codes.includes(code)) {
    modifierAlt.last = code;
  }
  
  if (modifierShift.codes.includes(code)) {
    modifierShift.last = code;
  }
  
  if (modifierMeta.codes.includes(code)) {
    modifierMeta.last = code;
  }
  
  function pushModifierKeyCode(modKey: boolean, modifier: IModifier): void {
    if (modKey && !modifier.codes.includes(code)) {
      codes.push(modifier.last || modifier.codes[0]);
    }
  }
  
  pushModifierKeyCode(e.ctrlKey, modifierCtrl);
  pushModifierKeyCode(e.altKey, modifierAlt);
  pushModifierKeyCode(e.shiftKey, modifierShift);
  pushModifierKeyCode(e.metaKey, modifierMeta);
  
  return {
    codes,
    capsLock: e.getModifierState('CapsLock')
  };
}