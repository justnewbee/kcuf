import {
  TMeta
} from './types';

export default {
  title: 'keymap'
} satisfies TMeta;

export { default as Default } from './story-default';
export { default as DollarMod } from './story-$mod';
export { default as Combo } from './story-combo';
export { default as KeysInput } from './story-keys-input';
export { default as KeysExtra } from './story-keys-extra';
export { default as CaseSensitive } from './story-case-sensitive';
export { default as ReturnFalse } from './story-return-false';
export { default as Target } from './story-target';