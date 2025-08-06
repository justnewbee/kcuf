import {
  ReactElement
} from 'react';

import Heading from '@theme/Heading';

import {
  IFeatureProps
} from '../types';

export default function Feature({
  title,
  Svg,
  description
}: IFeatureProps): ReactElement {
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