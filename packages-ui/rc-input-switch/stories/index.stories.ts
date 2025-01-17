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
