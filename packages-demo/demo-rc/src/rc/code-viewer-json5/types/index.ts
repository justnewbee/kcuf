import {
  CodeViewerProps
} from '../../code-viewer';

export interface ICodeViewerJson5Props<T = unknown> extends Omit<CodeViewerProps, 'language' | 'children' | 'content' | 'onChange'> {
  o: T;
  onChange?(value: T): void;
}
