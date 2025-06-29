import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  H1,
  Code
} from '../../simple';
import Form from '../../form';
import Button from '../../button';
import PromiseViewer from '../../promise-viewer';
import {
  ITestApiProps
} from '../types';

const ScForm = styled(Form)`
  margin-bottom: 8px;
`;

/**
 * 测试 Api 专用
 */
export default function TestApi({
  title,
  name,
  type,
  formItems = [],
  auto,
  test
}: ITestApiProps): ReactElement {
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  const handleTest = useCallback(() => {
    setStatePromise(test());
  }, [test, setStatePromise]);
  
  useEffect(() => {
    if (auto) {
      handleTest();
    }
  }, [auto, handleTest]);
  
  return <>
    <H1>{title}</H1>
    <ScForm {...{
      dense: true,
      items: [...formItems, {
        content: <>
          <Button onClick={handleTest}>{name}</Button>
          &nbsp;→&nbsp;
          <Code>Promise&lt;{type}&gt;</Code>
        </>
      }]
    }} />
    <PromiseViewer promise={statePromise} />
  </>;
}
