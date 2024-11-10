import {
  TMeta
} from './types';

import Dialog from '../src';

export default {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Default } from './story-default';
