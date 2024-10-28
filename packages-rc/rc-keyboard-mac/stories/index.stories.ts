import KeyboardMac from '../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'KeyboardMac',
  component: KeyboardMac,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {};

export const Controlled: TStory = {
  args: {
    listen: false,
    codes: ['TheFn', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  }
};