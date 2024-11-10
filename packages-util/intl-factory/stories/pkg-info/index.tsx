import React from 'react';

import {
  PackageInfo
} from '@kcuf/demo-rc';

import pkgInfo from '../../package.json';

export default function PkgInfo(): JSX.Element {
  return <PackageInfo info={pkgInfo} />;
}