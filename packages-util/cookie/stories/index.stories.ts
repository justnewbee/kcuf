import {
  Meta
} from '@storybook/react-vite';

export default {
  title: 'cookie',
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta;

export { default as Default } from './story-default';
