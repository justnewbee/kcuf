import {
  StrictMode
} from 'react';

import {
  Preview
} from '@storybook/react-vite';
import {
  MinimalNormalize
} from '@kcuf/demo-rc';

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
