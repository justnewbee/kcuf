import {
  EKeyboardCode
} from '../enum';
import {
  IKeyboardInfo,
  IModifier
} from '../types';

const modifierCtrl: IModifier = {
  codes: [EKeyboardCode.CONTROL_LEFT, EKeyboardCode.CONTROL_RIGHT],
  last: null
};
const modifierAlt: IModifier = {
  codes: [EKeyboardCode.ALT_LEFT, EKeyboardCode.ALT_RIGHT],
  last: null
};
const modifierShift: IModifier = {
  codes: [EKeyboardCode.SHIFT_LEFT, EKeyboardCode.SHIFT_RIGHT],
  last: null
};
const modifierMeta: IModifier = {
  codes: [EKeyboardCode.META_LEFT, EKeyboardCode.META_RIGHT],
  last: null
};

export default function getEventInfo(e: KeyboardEvent): IKeyboardInfo {
  const codes: EKeyboardCode[] = [];
  const code = e.code as EKeyboardCode;
  
  if (code === EKeyboardCode.DELETE) {
    codes.push(EKeyboardCode.BACKSPACE);
    codes.push(EKeyboardCode.FN);
  } else {
    codes.push(code as EKeyboardCode);
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
    capsLock: e.getModifierState(EKeyboardCode.CAPS_LOCK)
  };
}