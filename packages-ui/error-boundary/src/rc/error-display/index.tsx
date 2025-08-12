import {
  ErrorInfo,
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  parseErrorStack
} from '../../util';

const ScErrorDisplay = styled.div`
  padding: 24px;
`;

const ScErrorHeader = styled.h1`
  margin: 0;
  font-size: 1.8em;
  font-weight: 400;
  line-height: 1.25;
`;

const ScDetails = styled.details`
  margin-top: 16px;
  
  summary {
    cursor: pointer;
  }
`;

const ScStackItem = styled.div`
  margin: 12px 0 0 16px;
  font-weight: 200;
  word-wrap: break-word;
  white-space: pre-wrap;
  
  h3 {
    margin: 0 0 2px;
    font-size: 1.2em;
    font-weight: 200;
  }
  
  a {
    opacity: 0.4;
    color: currentcolor;
    text-decoration: none;
    transition: all ease-in-out 300ms;
    
    &:hover {
      opacity: 0.75;
    }
  }
`;

interface IProps {
  error: Error;
  errorInfo?: ErrorInfo;
}

export default function ErrorDisplay(props: IProps): ReactElement {
  const {
    error,
    errorInfo
  } = props;
  const errorStack = parseErrorStack(error);
  
  return <ScErrorDisplay>
    <ScErrorHeader>💥 {error.toString()}</ScErrorHeader>
    <ScDetails open>
      <summary>Details</summary>
      {errorStack.length ? errorStack.map(v => <ScStackItem key={`${v.name}@${v.url}`}>
        <h3>{v.name || '<Anonymous>'}</h3>
        <a href={v.url} target="_blank" rel="noreferrer">{v.url}</a>
      </ScStackItem>) : <ScStackItem>{error.stack ?? errorInfo?.componentStack ?? 'Mystic Error...'}</ScStackItem>}
    </ScDetails>
  </ScErrorDisplay>;
}
