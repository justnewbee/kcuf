import {
  ReactElement,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

import JsonViewer from '../../json-viewer';
import {
  ELoading
} from '../enum';
import {
  IPromiseViewerProps,
  IPromiseResult
} from '../types';
import {
  DEFAULT_RESULT
} from '../const';
import {
  normalizeError
} from '../util';

const ScPromiseViewer = styled.div`
  position: relative;
`;

const ScInfoIdle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 123;
  padding: 4px 8px;
  font-family: Arial, sans-serif;
  font-size: 11px;
  color: hsl(0 0% 100%);
  background-color: hsl(0 0% 40%);
  pointer-events: none;
`;

const ScInfoLoading = styled(ScInfoIdle)`
  background-color: hsl(285 100% 40%);
`;

const ScInfoResolved = styled(ScInfoIdle)`
  background-color: hsl(120 100% 30%);
`;

const ScInfoRejected = styled(ScInfoIdle)`
  background-color: hsl(0 100% 40%);
`;

export default function PromiseViewer({
  promise
}: IPromiseViewerProps): ReactElement {
  const [stateResult, setStateResult] = useState<IPromiseResult>(DEFAULT_RESULT);
  
  useEffect(() => {
    if (!promise) {
      setStateResult(DEFAULT_RESULT);
      
      return;
    }
    
    setStateResult({
      loading: ELoading.LOADING,
      result: null
    });
    
    const start = Date.now();
    
    promise.then(result => setStateResult({
      loading: ELoading.RESOLVED,
      result,
      duration: Date.now() - start
    })).catch(err => setStateResult({
      loading: ELoading.REJECTED,
      result: err,
      duration: Date.now() - start
    }));
  }, [promise]);
  
  return <ScPromiseViewer>
    {((): ReactElement => {
      switch (stateResult.loading) {
      case ELoading.LOADING:
        return <ScInfoLoading>Loading...</ScInfoLoading>;
      case ELoading.RESOLVED:
        return <ScInfoResolved>Success ({stateResult.duration}ms)</ScInfoResolved>;
      case ELoading.REJECTED:
        return <ScInfoRejected>Failed ({stateResult.duration}ms)</ScInfoRejected>;
      default:
        return <ScInfoIdle>Idle</ScInfoIdle>;
      }
    })()}
    <JsonViewer o={stateResult.loading === ELoading.REJECTED ? normalizeError(stateResult.result as Error) : stateResult.result} />
  </ScPromiseViewer>;
}
