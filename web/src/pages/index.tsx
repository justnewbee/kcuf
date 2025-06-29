import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

const ScHeader = styled.header`
  text-align: center;
  
  @media screen and (max-width: 996px) {
    padding: 2rem;
  }
`;
const ScButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function HomepageHero(): ReactElement {
  const {
    siteConfig
  } = useDocusaurusContext();
  
  return <ScHeader className="hero">
    <div className="container">
      <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      <ScButtons>
        <Link className="button button--secondary button--lg" to="/docs/tutor/intro">
          Docusaurus Tutorial - 5min ⏱️
        </Link>
      </ScButtons>
    </div>
  </ScHeader>;
}

export default function Home(): ReactElement {
  const {
    siteConfig
  } = useDocusaurusContext();
  
  return <Layout {...{
    title: `Hello from ${siteConfig.title}`,
    description: 'Description will go into a meta tag in <head />'
  }}>
    <HomepageHero />
    <main>
      <HomepageFeatures />
    </main>
  </Layout>;
}
