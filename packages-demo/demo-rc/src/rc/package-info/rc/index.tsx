import {
  ReactElement
} from 'react';

import Alert from '../../alert';
import {
  IPackageInfoProps
} from '../types';

/**
 * 展示 package.info 信息
 */
export default function PackageInfo({
  pkg: {
    name,
    version,
    description
  }
}: IPackageInfoProps): ReactElement {
  return <Alert title={`${name}@${version}`} type="info">
    {description}
  </Alert>;
}
