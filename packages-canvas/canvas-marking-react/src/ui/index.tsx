import {
  ReactElement
} from 'react';

import {
  useProps,
  useDomRef
} from '../model';

export default function Ui(): ReactElement {
  const {
    className
  } = useProps();
  const domRef = useDomRef();
  
  return <div ref={domRef} {...{
    className,
    style: {
      height: '100%',
      minHeight: 120
    }
  }} />;
}
