import {
  ReactElement
} from 'react';

import {
  InputCheckbox
} from '@kcuf/demo-rc';
import {
  CanvasMarkingPropsPlugins
} from '@kcuf/canvas-marking-react-headless';

import {
  useHandleTogglePlugin,
  usePlugins
} from '../../demo-model';

const PLUGINS: (keyof CanvasMarkingPropsPlugins)[] = [
  'cursor',
  'tooltip',
  'magnet',
  'snapping',
  'zoom',
  'move',
  'fps',
  'stats'
];

export default function OpsPlugins(): ReactElement {
  const plugins = usePlugins();
  const handleTogglePlugin = useHandleTogglePlugin();
  
  return <>
    {PLUGINS.map(v => <InputCheckbox key={v} {...{
      label: v,
      checked: plugins[v],
      onChange: () => handleTogglePlugin(v)
    }} />)}
  </>;
}
