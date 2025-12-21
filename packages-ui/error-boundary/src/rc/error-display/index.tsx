import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  IErrorCaught
} from '../../types';
import {
  getErrorMessage,
  getErrorStackItems
} from '../../util';

interface IProps extends IErrorCaught {}

const ScErrorDisplay = styled.div`
  padding: 1.6em;
`;
const ScErrorHeader = styled.h1`
  margin: 0;
  font-size: 1.8em;
  font-weight: 400;
  line-height: 1.25;
`;
const ScDetails = styled.details`
  margin-top: 1.5em;
  
  summary {
    font-size: 1.1em;
    cursor: pointer;
  }
`;
const ScStackItem = styled.div`
  margin: 0.5em 0 1em 1.5em;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  
  h3 {
    margin: 0;
    font-size: 1em;
    font-weight: 400;
  }
  
  a {
    opacity: 0.5;
    color: currentcolor !important;
    font-weight: 200;
    text-decoration: none;
    transition: all ease-in-out 300ms;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function ErrorDisplay(props: IProps): ReactElement {
  const errorStackItems = getErrorStackItems(props);
  
  return <ScErrorDisplay>
    <ScErrorHeader>💥 {getErrorMessage(props)}</ScErrorHeader>
    <ScDetails open>
      <summary>Details</summary>
      {errorStackItems.length ? errorStackItems.map((v, i) => <ScStackItem key={`${v.name}-${i}`}>
        <h3>{v.name || '<Anonymous>'}</h3>
        <a href={v.url} target="_blank" rel="noreferrer">{v.url.replace(/^https?:\/\/[^/]+/, '')}</a>
      </ScStackItem>) : <ScStackItem>Mystic Error...</ScStackItem>}
    </ScDetails>
  </ScErrorDisplay>;
}
