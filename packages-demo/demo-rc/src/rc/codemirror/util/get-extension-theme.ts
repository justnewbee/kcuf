import {
  Extension
} from '@codemirror/state';
import {
  oneDark
} from '@codemirror/theme-one-dark';
import {
  material,
  materialLight
} from '@uiw/codemirror-theme-material';

import {
  ICodemirrorProps
} from '../types';

export default function getExtensionTheme(theme: ICodemirrorProps['theme'] = 'material-dark'): Extension | null {
  switch (theme) {
    case 'material-dark':
      return material;
    case 'material-light':
      return materialLight;
    case 'one-dark':
      return oneDark;
    default:
      return null;
  }
}