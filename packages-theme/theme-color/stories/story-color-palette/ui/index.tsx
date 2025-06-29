import {
  ReactElement
} from 'react';

import {
  DarkStyle
} from '../../rc';
import {
  useStateDark
} from '../model';

import About from './about';
import Controls from './controls';
import ColorGrid from './color-grid';
import ColorArrayCode from './color-array-code';

export default function StoryColorPalette(): ReactElement {
  const [dark] = useStateDark();
  
  return <>
    {dark ? <DarkStyle /> : null}
    <About />
    <Controls />
    <ColorGrid />
    <ColorArrayCode /></>;
}
