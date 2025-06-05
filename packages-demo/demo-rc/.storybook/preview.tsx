import {
  StrictMode
} from 'react';

import {
  Preview
} from '@storybook/react-vite';

import {
  MinimalNormalize
} from '../src';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    story => <StrictMode>
      <MinimalNormalize />
      {story()}
    </StrictMode>
  ]
} as Preview;
