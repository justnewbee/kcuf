import {
  ReactElement
} from 'react';

import {
  useFormDomProps
} from '@kcuf/rc-headless-form';

import {
  FormItems
} from './rc-container';

/**
 * 一个既简单的 Form
 */
export default function Ui(): ReactElement {
  const formDomProps = useFormDomProps();
  
  return <form {...formDomProps}>
    <FormItems />
  </form>;
}
