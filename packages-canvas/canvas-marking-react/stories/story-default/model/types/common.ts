import {
  RefObject
} from 'react';

import {
  CanvasMarkingPropsPlugins,
  CanvasMarkingImperativeRef
} from '../../../../src';

export type TMutableRefImperative = RefObject<CanvasMarkingImperativeRef | null>;

export type TTogglePluginPayload = keyof CanvasMarkingPropsPlugins;

export type TStatePlugins = Required<CanvasMarkingPropsPlugins>;
