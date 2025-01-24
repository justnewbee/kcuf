import {
  ReactElement
} from 'react';

import About from './about';
import GlobalStyle from './global-style';
import Controls from './controls';
import ColorGrid from './color-grid';
import ColorArrayCode from './color-array-code';

export default function StoryColorPalette(): ReactElement {
  return <>
    <GlobalStyle />
    <About />
    <Controls />
    <ColorGrid />
    <ColorArrayCode />
  </>;
}
