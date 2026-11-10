import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  parseErrorStack
} from '../../../util';

interface IProps {
  title: string;
  stack?: string | null;
}

const ScErrorStack = styled.details`
  margin-top: 1.5em;
  
  summary {
    font-size: 1.2em;
    font-weight: 500;
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

export default function ErrorStack({
  title,
  stack
}: IProps): ReactElement | null {
  const errorStackItems = parseErrorStack(stack);
  
  return errorStackItems?.length ? <ScErrorStack open>
    <summary>{title}</summary>
    {errorStackItems.length ? errorStackItems.map((v, i) => <ScStackItem key={`${v.name}-${i}`}>
      <h3>{v.name || '<Anonymous>'}</h3>
      <a href={v.url} target="_blank" rel="noreferrer">{v.url.replace(/^https?:\/\/[^/]+/, '')}</a>
    </ScStackItem>) : <ScStackItem>Mystic Error...</ScStackItem>}
  </ScErrorStack> : null;
}
