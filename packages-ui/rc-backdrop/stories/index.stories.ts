import {
  Meta
} from '@storybook/react';

import Backdrop from '../src';

type TMeta = Meta<typeof Backdrop>;

export default {
  title: 'Backdrop'
} satisfies TMeta;

export { default as All } from './story-all';
