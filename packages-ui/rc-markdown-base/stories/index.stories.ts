import {
  Meta
} from '@storybook/react-vite';

import Markdown from '../src';

type TMeta = Meta<typeof Markdown>;

export default {
  title: 'Markdown'
} satisfies TMeta;

export { default as Default } from './story-default';
export { default as CommonMark } from './story-common';
export { default as Gfm } from './story-gfm';
export { default as Headings } from './story-headings';
export { default as Directive } from './story-directive';
export { default as ExtensionMath } from './story-extension-math';
export { default as ExtensionVariables } from './story-extension-variables';
