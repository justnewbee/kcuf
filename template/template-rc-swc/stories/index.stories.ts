import Alert from '../src';

import {
  TMeta
} from './types';

export default {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Primary } from './story-primary';
export { default as All } from './story-all';
