import {
  Meta
} from '@storybook/react-vite';

export default {
  title: 'Layout/FullPage',
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

export { default as Default } from './story-default';
