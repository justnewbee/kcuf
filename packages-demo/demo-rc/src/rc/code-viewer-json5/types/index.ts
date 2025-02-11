import {
  CodeViewerProps
} from '../../code-viewer';

export interface ICodeViewerJson5Props extends Omit<CodeViewerProps, 'language' | 'children' | 'content'> {
  o: unknown;
}
