import {
  ReactElement
} from 'react';
import styled from 'styled-components';

interface IImportFromProps {
  name: string;
  pkg?: string;
}

const ScImportFrom = styled.span`
  font-family: var(--ifm-font-family-monospace);
  font-size: 0.9em;
`;
const ScKeyword = styled.span`
  color: var(--k-color-keyword);
`;
const ScWhat = styled.span`
  color: var(--k-color-compoent);
`;
const ScPkg = styled.span`
  color: var(--k-color-string);
`;

export default function ImportFrom({
  name,
  pkg = 'kcuf-ui'
}: IImportFromProps): ReactElement {
  return <ScImportFrom>
    <ScKeyword>import</ScKeyword>{' { '}<ScWhat>{name}</ScWhat>{' } '}<ScKeyword>from</ScKeyword>{' '}<ScPkg>&apos;{pkg}&apos;</ScPkg>;
  </ScImportFrom>;
}
