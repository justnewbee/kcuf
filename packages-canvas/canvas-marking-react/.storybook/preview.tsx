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
    story => <>
      <MinimalNormalize />
      {story()}
    </>
  ]
} as Preview;
