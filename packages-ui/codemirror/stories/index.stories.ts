import {
  Meta
} from '@storybook/react-vite';

import Codemirror from '../src';

export default {
  title: 'Codemirror',
  component: Codemirror,
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Codemirror>;

export { default as Default } from './story-default';
export { default as Json } from './story-json';
export { default as Css } from './story-css';
export { default as Markdown } from './story-markdown';
