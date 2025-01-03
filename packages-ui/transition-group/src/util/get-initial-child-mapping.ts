import { cloneElement } from 'react';
import getChildMapping from './get-child-mapping';
import getProp from './get-prop';

export default function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, child => {
    return cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props),
    });
  });
}