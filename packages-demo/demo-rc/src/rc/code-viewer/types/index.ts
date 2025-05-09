import {
  CodemirrorProps
} from '../../codemirror';

export interface ICodeViewerProps extends CodemirrorProps {
  content?: string;
  children?: string; // a fallback to content
}
