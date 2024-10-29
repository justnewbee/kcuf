import {
  TMeta
} from './types';

export default {
  title: 'keymap'
} satisfies TMeta;

export { default as Default } from './story-default';
export { default as Combo } from './story-combo';
export { default as Keys } from './story-keys';
export { default as ReturnFalse } from './story-return-false';