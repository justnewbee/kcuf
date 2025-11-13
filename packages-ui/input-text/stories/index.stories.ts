import InputText from '../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'InputText',
  component: InputText,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    addonBefore: '',
    addonAfter: '',
    addonPrefix: '',
    addonSuffix: '',
    placeholder: '',
    disabled: false
  }
};

export const Anatomy: TStory = {
  args: {
    addonBefore: 'before',
    addonAfter: 'after',
    addonPrefix: 'prefix',
    addonSuffix: 'suffix',
    placeholder: 'placeholder',
    withClear: true,
    maxLength: 7,
    count: true
  }
};

export { default as Controllable } from './story-controllable';
export { default as Focusing } from './story-focusing';
