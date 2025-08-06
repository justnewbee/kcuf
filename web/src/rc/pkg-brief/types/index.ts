import {
  ReactNode
} from 'react';

import {
  PkgImportProps
} from '../../pkg-import';

export interface IPkgBriefProps extends PkgImportProps {
  children: NonNullable<ReactNode>;
}
