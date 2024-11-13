import {
  ReactElement
} from 'react';

import {
  PackageInfo
} from '../../src';
import pkg from '../../package.json';

export default function StoryDefault(): ReactElement {
  return <PackageInfo pkg={pkg} />;
}
