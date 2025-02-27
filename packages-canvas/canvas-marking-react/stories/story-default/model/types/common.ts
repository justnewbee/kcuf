import {
  MutableRefObject
} from 'react';

import {
  CanvasMarkingPropsPlugins,
  CanvasMarkingImperativeRef
} from '@kcuf/canvas-marking-react-headless';

export type TMutableRefImperative = MutableRefObject<CanvasMarkingImperativeRef | null>;

export type TTogglePluginPayload = keyof CanvasMarkingPropsPlugins;

export type TStatePlugins = Required<CanvasMarkingPropsPlugins>;
