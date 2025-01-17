import {
  ITriggerFocusOptions
} from '../types';

export default function triggerFocus(el: HTMLElement, {
  cursor,
  ...options
}: ITriggerFocusOptions = {}): void {
  el.focus(options);
  
  if (!cursor || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
    return;
  }
  
  try { // input types: password, search, tel, text, or url
    const input = el as HTMLInputElement;
    const len = input.value.length;
    
    switch (cursor) {
    case 'start':
      input.setSelectionRange(0, 0);
      
      break;
    case 'end':
      input.setSelectionRange(len, len);
      
      break;
    default:
      break;
    }
  } catch (_err) { // InvalidStateError
    // ignore
  }
}
