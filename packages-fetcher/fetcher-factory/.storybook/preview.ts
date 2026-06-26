import {
  Preview
} from '@storybook/react-vite';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
} satisfies Preview;
