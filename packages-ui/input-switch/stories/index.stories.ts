import InputSwitch from '../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'InputSwitch',
  component: InputSwitch,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Primary: TStory = {};

export { default as Controllable } from './story-controllable';
