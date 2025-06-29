import {
  ReactElement,
  ReactNode,
  ComponentType,
  ComponentProps
} from 'react';
import styled from 'styled-components';

import Heading from '@theme/Heading';
import Svg1 from '@site/static/img/undraw_docusaurus_mountain.svg';
import Svg2 from '@site/static/img/undraw_docusaurus_tree.svg';
import Svg3 from '@site/static/img/undraw_docusaurus_react.svg';

interface IFeatureItem {
  title: string;
  Svg: ComponentType<ComponentProps<'svg'>>;
  description: ReactNode;
}

const FEATURE_LIST: IFeatureItem[] = [{
  title: 'Easy to Use',
  Svg: Svg1,
  description: <>
    Docusaurus was designed from the ground up to be easily installed and
    used to get your website up and running quickly.
  </>
}, {
  title: 'Focus on What Matters',
  Svg: Svg2,
  description: <>
    Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
    ahead and move your docs into the <code>docs</code> directory.
  </>
}, {
  title: 'Powered by React',
  Svg: Svg3,
  description: <>
    Extend or customize your website layout by reusing React. Docusaurus can
    be extended while reusing the same header and footer.
  </>
}];

const ScSection = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
  
  svg {
    width: 200px;
    height: 200px;
  }
`;

function Feature({
  title,
  Svg,
  description
}: IFeatureItem): ReactElement {
  return <div className="col col--4">
    <div className="text--center">
      <Svg role="img" />
    </div>
    <div className="text--center padding-horiz--md">
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  </div>;
}

export default function HomepageFeatures(): ReactElement {
  return <ScSection>
    <div className="container">
      <div className="row">
        {FEATURE_LIST.map((props, idx) => <Feature key={idx} {...props} />)}
      </div>
    </div>
  </ScSection>;
}
