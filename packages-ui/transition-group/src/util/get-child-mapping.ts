import { Children, isValidElement } from 'react';

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
export default function getChildMapping(children, mapFn) {
  let mapper = child => mapFn && isValidElement(child) ? mapFn(child) : child;
  let result = Object.create(null);
  
  if (children) {
    Children.map(children, c => c).forEach(child => {
      // run the map function here instead so that the key is the computed one
      result[child.key] = mapper(child);
    });
  }
  
  return result;
}