import {
  Meta
} from '@storybook/react-vite';

import Icon from '../src';

type TMeta = Meta<typeof Icon>;

export default {
  title: 'Icon'
} satisfies TMeta;

export { default as All } from './story-all';
