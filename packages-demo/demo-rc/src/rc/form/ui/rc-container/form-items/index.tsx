import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf/rc-headless-form';

import {
  getFormItemKey
} from '../../util';
import Item from '../form-item';

export default function FormItems(): ReactElement {
  const {
    items
  } = useProps();
  
  return <>{items.map((v, i): null | ReactElement => {
    if (!v) {
      return null;
    }
    
    return <Item {...v} key={getFormItemKey(v, i)} />;
  })}</>;
}
