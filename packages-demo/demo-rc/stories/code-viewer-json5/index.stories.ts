import {
  Meta,
  StoryObj
} from '@storybook/react';

import {
  CodeViewerJson5
} from '../../src';

export type TMeta = Meta<typeof CodeViewerJson5>;
export type TStory = StoryObj<TMeta>;

export default {
  title: 'Display/CodeViewerJson5',
  component: CodeViewerJson5,
  tags: ['autodocs']
} satisfies TMeta;

export const O: TStory = {
  args: {
    o: {
      a: 'a',
      b: false,
      c: 1234,
      d: [111, 222],
      e: {
        aa: 123,
        bb: 222
      }
    }
  }
};

export const A: TStory = {
  args: {
    o: [1, '二', true, {
      a: 'AAA'
    }]
  }
};

export const S: TStory = {
  args: {
    o: 'string'
  }
};

export const N: TStory = {
  args: {
    o: 123456
  }
};

export const B: TStory = {
  args: {
    o: true
  }
};
