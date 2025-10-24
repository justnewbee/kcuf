import {
  Meta
} from '@storybook/react-vite';

export default {
  title: 'copy-text',
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta;

export { default as Default } from './story-default';
