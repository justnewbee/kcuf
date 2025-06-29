import {
  Meta,
  StoryObj
} from '@storybook/react-vite';

import {
  Select
} from '../../src';

type TMeta = Meta<typeof Select>;
type TStory = StoryObj<TMeta>;

const meta = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    datasource: [{
      value: '12345'
    }, {
      value: '54321',
      label: 'This can be a very lo-o-o-o-o-o-ng label'
    }],
    onChange: console.info // eslint-disable-line no-console
  }
};

export const String: TStory = {
  args: {
    datasource: ['i think', 'you are right'],
    onChange: console.info // eslint-disable-line no-console
  }
};

export const Number: TStory = {
  args: {
    datasource: [111, 2222],
    onChange: console.info // eslint-disable-line no-console
  }
};

export const Boolean: TStory = {
  args: {
    datasource: [true, false],
    onChange: console.info // eslint-disable-line no-console
  }
};

export const Mixed: TStory = {
  args: {
    datasource: [111, 'pure string', true, {
      value: 'THIS_IS_STRING_IN_OBJECT',
      label: 'This is string in object'
    }, {
      value: 'value only'
    }],
    onChange: console.info // eslint-disable-line no-console
  }
};
