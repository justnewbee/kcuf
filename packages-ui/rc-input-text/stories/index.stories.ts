import InputSwitch from '../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'InputSwitch',
  component: InputSwitch,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {};

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
