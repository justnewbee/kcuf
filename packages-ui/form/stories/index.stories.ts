import Form from '../src';

import {
  TMeta
} from './types';

export default {
  title: 'Form',
  component: Form,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Default } from './story-default';
