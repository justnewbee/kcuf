import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Svg1 from '@site/static/img/undraw-docusaurus-mountain.svg';
import Svg2 from '@site/static/img/undraw-docusaurus-tree.svg';
import Svg3 from '@site/static/img/undraw-docusaurus-react.svg';

import {
  IFeatureProps
} from './types';
import Feature from './feature';

const FEATURE_LIST: IFeatureProps[] = [{
  Svg: Svg1,
  title: 'Easy to Use',
  description: <>
    Docusaurus was designed from the ground up to be easily installed and
    used to get your website up and running quickly.
  </>
}, {
  Svg: Svg2,
  title: 'Focus on What Matters',
  description: <>
    Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
    ahead and move your docs into the <code>docs</code> directory.
  </>
}, {
  Svg: Svg3,
  title: 'Powered by React',
  description: <>
    Extend or customize your website layout by reusing React. Docusaurus can
    be extended while reusing the same header and footer.
  </>
}];

const ScHomeFeatures = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
  
  svg {
    width: 200px;
    height: 200px;
  }
`;

export default function HomeFeatures(): ReactElement {
  return <ScHomeFeatures>
    <div className="container">
      <div className="row">
        {FEATURE_LIST.map((props, idx) => <Feature key={idx} {...props} />)}
      </div>
    </div>
  </ScHomeFeatures>;
}
