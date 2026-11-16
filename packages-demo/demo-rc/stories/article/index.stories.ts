import {
  Meta
} from '@storybook/react-vite';

export default {
  title: 'Typo/Article',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export { default as Default } from './story-default';
