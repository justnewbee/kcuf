import {
  CodemirrorProps
} from '../../codemirror';

export interface ICodeViewerProps extends Pick<CodemirrorProps, 'language' | 'theme' | 'lines'> {
  content?: string;
  children?: string; // a fallback to content
}