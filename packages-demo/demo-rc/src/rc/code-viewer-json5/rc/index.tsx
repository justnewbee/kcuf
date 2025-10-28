import {
  ReactElement,
  useCallback
} from 'react';
import json5 from 'json5';

import {
  json5Stringify
} from '../../../util';
import CodeViewer from '../../code-viewer';
import {
  ICodeViewerJson5Props
} from '../types';

/**
 * 展示简化的 JSON
 */
export default function CodeViewerJson5<T = unknown>({
  o,
  onChange,
  ...props
}: ICodeViewerJson5Props<T>): ReactElement {
  const handleChange = useCallback((value: string): void => {
    onChange?.(json5.parse<T>(value)); // eslint-disable-line import/no-named-as-default-member
  }, [onChange]);
  
  return <CodeViewer {...{
    ...props,
    language: 'json5',
    onChange: handleChange
  }}>{json5Stringify(o)}</CodeViewer>;
}
