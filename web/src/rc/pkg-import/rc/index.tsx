import {
  ReactElement
} from 'react';

import {
  IPkgImportProps
} from '../types';

import {
  ScPkgImport,
  ScKeyword,
  ScWhat,
  ScPkg
} from './sc.styled';

export default function PkgImport({
  name,
  named,
  pkg
}: IPkgImportProps): ReactElement {
  return <ScPkgImport>
    <ScKeyword>import</ScKeyword>{named ? ' { ' : ' '}<ScWhat>{name}</ScWhat>{named ? ' } ' : ' '}<ScKeyword>from</ScKeyword>{' '}<ScPkg>&apos;{pkg}&apos;</ScPkg>;
  </ScPkgImport>;
}
