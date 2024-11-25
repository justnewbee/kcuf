import Button from '../src';

import {
  TMeta
} from './types';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Default } from './story-default';
