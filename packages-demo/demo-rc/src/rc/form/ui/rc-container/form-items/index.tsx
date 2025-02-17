import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-form-headless';

import {
  getFormItemKey
} from '../../util';
import FormItem from '../form-item';

export default function FormItems(): ReactElement {
  const {
    items
  } = useProps();
  
  return <>
    {items.map((v, i): null | ReactElement => {
      if (!v) {
        return null;
      }
      
      return <FormItem {...v} key={getFormItemKey(v, i)} />;
    })}
  </>;
}
