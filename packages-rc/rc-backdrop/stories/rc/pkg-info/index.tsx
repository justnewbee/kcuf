import {
  ReactElement
} from 'react';

import {
  PackageInfo
} from '@kcuf/demo-rc';

import pkg from '../../../package.json';

export default function PkgInfo(): ReactElement {
  return <PackageInfo pkg={pkg} />;
}