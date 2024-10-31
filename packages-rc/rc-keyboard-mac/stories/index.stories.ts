import Keyboard, {
  KeyboardCode
} from '../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Keyboard',
  component: Keyboard,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {};

export const Controlled: TStory = {
  args: {
    codes: [
      KeyboardCode.W,
      KeyboardCode.A,
      KeyboardCode.S,
      KeyboardCode.D,
      KeyboardCode.ARROW_UP,
      KeyboardCode.ARROW_DOWN,
      KeyboardCode.ARROW_LEFT,
      KeyboardCode.ARROW_RIGHT
    ],
    modifierState: {
      shift: 'left',
      fn: true
    }
  }
};

export const ModifierState: TStory = {
  args: {
    modifierState: true
  }
};

export { default as Event } from './story-event';
