import {
  ReactNode
} from 'react';

import useModelProps from './_use-model-props';

export default function useButtonLabel(): ReactNode {
  const {
    label,
    children
  } = useModelProps();
  
  return label ?? children;
}
