import Dialog from '../src';

import {
  TMeta
} from './types';

export default {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Default } from './story-default';
