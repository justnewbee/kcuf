import {
  Meta,
  StoryObj
} from '@storybook/react-vite';

import {
  CodeViewer
} from '../../src';

import {
  CODE_TSX,
  CODE_CSS,
  CODE_HTML,
  CODE_JSON,
  CODE_MARKDOWN
} from './const';

type TMeta = Meta<typeof CodeViewer>;
type TStory = StoryObj<TMeta>;

export default {
  title: 'Display/CodeViewer',
  component: CodeViewer,
  tags: ['autodocs']
};

export const Tsx: TStory = {
  args: {
    language: 'tsx',
    children: CODE_TSX
  }
};

export const Css: TStory = {
  args: {
    language: 'css',
    children: CODE_CSS
  }
};

export const Html: TStory = {
  args: {
    language: 'html',
    children: CODE_HTML
  }
};

export const Json: TStory = {
  args: {
    language: 'json',
    children: CODE_JSON
  }
};

export const Md: TStory = {
  args: {
    language: 'md',
    children: CODE_MARKDOWN
  }
};
