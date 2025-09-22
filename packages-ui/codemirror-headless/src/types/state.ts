import {
  ICodemirrorInfo
} from './common';

export interface IModelState {
  dom: HTMLDivElement | null;
  codemirror: ICodemirrorInfo | null;
}
