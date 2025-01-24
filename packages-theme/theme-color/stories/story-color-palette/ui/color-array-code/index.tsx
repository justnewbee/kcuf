import {
  ReactElement
} from 'react';

import {
  CodeViewer
} from '@kcuf/demo-rc';

import {
  useColorArrayCode
} from '../../model';

export default function ColorArrayCode(): ReactElement {
  const colorArrayCode = useColorArrayCode();
  
  return <CodeViewer language="ts">
    {colorArrayCode || '// 点击任何色块'}
  </CodeViewer>;
}
