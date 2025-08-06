import {
  ReactElement
} from 'react';

import {
  IPkgInstallProps
} from '../types';

import {
  ScPkgInstall,
  ScPnpm
} from './sc.styled';

export default function PkgInstall({
  pkg
}: IPkgInstallProps): ReactElement {
  return <ScPkgInstall>
    <ScPnpm>pnpm</ScPnpm>{` add ${pkg}`}
  </ScPkgInstall>;
}
