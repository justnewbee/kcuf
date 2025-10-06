import {
  Extension
} from '@codemirror/state';

import {
  ICodemirrorProps
} from '../types';

import getExtensionsBasic from './get-extensions-basic';
import getExtensionLanguage from './get-extension-language';
import getExtensionHeight from './get-extension-height';
import getExtensionTheme from './get-extension-theme';

export default function getExtensions(props: ICodemirrorProps): Extension[] {
  const extensions = getExtensionsBasic();
  
  function push(ex: Extension | null): void {
    if (ex) {
      extensions.push(ex);
    }
  }
  
  push(getExtensionLanguage(props.language));
  push(getExtensionHeight(props.lines));
  push(getExtensionTheme(props.theme));
  
  return extensions;
}
