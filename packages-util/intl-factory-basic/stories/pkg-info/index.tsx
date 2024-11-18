import {
  ReactElement
} from 'react';

import {
  PackageInfo
} from '@kcuf/demo-rc';

import pkgInfo from '../../package.json';

export default function PkgInfo(): ReactElement {
  return <PackageInfo info={pkgInfo} />;
}
