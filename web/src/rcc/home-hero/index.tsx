import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Heading from '@theme/Heading';

const ScHeader = styled.header`
  text-align: center;
  
  @media screen and (width <= 996px) {
    padding: 2rem;
  }
`;
const ScButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function HomeHero(): ReactElement {
  const {
    siteConfig
  } = useDocusaurusContext();
  
  return <ScHeader className="hero">
    <div className="container">
      <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      <ScButtons>
        <Link className="button button--secondary button--lg" to="/docs/tutor">Docusaurus Tutorial - 5min ⏱️</Link>
      </ScButtons>
    </div>
  </ScHeader>;
}
