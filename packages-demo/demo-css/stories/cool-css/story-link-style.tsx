import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScLangChainDev = styled.section`
  a:where(:not([class])) {
    padding-block-end: 0.15em;
    background-image: linear-gradient(to bottom, rgb(0 0 0 / 12%) 0%, rgb(0 0 0 / 12%) 100%);
    background-repeat: no-repeat;
    background-position: 0 0.9em;
    background-size: 100%;
    color: #333;
    font-weight: 600;
    text-decoration: none;
    transition: color 200ms, background-position 200ms;
    
    &:hover {
      background-image: linear-gradient(to bottom, #345 0%, #345 100%);
      background-position: 0 0;
      color: #fff;
    }
  }
`;

export default function StoryLinkStyle(): ReactElement {
  return <>
    <ScLangChainDev>
      From <a href="https://blog.langchain.dev" target="_blank" rel="noreferrer">https://blog.langchain.dev</a>.
    </ScLangChainDev>
  </>;
}
