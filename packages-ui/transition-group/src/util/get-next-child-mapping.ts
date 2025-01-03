import { cloneElement, isValidElement } from 'react';
import getChildMapping from './get-child-mapping';
import mergeChildMappings from './merge-child-mapping';
import getProp from './get-prop';

export default function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  let nextChildMapping = getChildMapping(nextProps.children);
  let children = mergeChildMappings(prevChildMapping, nextChildMapping);

  Object.keys(children).forEach(key => {
    let child = children[key];

    if (!isValidElement(child)) return;

    const hasPrev = key in prevChildMapping;
    const hasNext = key in nextChildMapping;

    const prevChild = prevChildMapping[key];
    const isLeaving = isValidElement(prevChild) && !prevChild.props.in;

    // item is new (entering)
    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps),
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = cloneElement(child, { in: false });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps),
      });
    }
  });

  return children;
}
