import {
  ReactElement
} from 'react';

import {
  FullPage
} from '../../src';

export default function StoryDefault(): ReactElement {
  return <FullPage {...{
    header: <div style={{
      padding: 12
    }}>Header</div>,
    footer: <div style={{
      padding: 12
    }}>Footer</div>
  }}>
    <div style={{
      padding: 12
    }}>Body</div>
  </FullPage>;
}
