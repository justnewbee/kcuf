import {
  InputNumber
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Form/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    defaultValue: 'InputNumber'
  }
};
