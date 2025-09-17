import {
  RefCallback
} from 'react';

export interface IUseFullscreenResult {
  target: HTMLElement | null;
  enabled: boolean;
  fullscreen: boolean;
  toggle(): Promise<void>;
}

export type TUseFullscreenRefResult = [RefCallback<HTMLElement>, IUseFullscreenResult];
