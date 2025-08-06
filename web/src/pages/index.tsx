import {
  ReactElement
} from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import HomeFeatures from '@site/src/rc/home-features';
import HomeHero from '@site/src/rcc/home-hero';

export default function Home(): ReactElement {
  const {
    siteConfig
  } = useDocusaurusContext();
  
  return <Layout {...{
    title: `Hello from ${siteConfig.title}`,
    description: 'Description will go into a meta tag in <head />'
  }}>
    <HomeHero />
    <main>
      <HomeFeatures />
    </main>
  </Layout>;
}
