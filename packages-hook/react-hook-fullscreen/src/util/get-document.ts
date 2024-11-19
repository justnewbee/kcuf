import {
  IDocument
} from '../types';

export default function getDocument(): IDocument {
  return window.document as IDocument;
}
