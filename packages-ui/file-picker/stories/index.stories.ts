import {
  Meta
} from '@storybook/react-vite';

import FilePicker from '../src';

type TMeta = Meta<typeof FilePicker>;

export default {
  title: 'FilePicker',
  component: FilePicker,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export { default as Default } from './story-default';
