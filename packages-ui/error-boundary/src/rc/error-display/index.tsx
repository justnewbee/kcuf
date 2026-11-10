import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  IErrorCaught
} from '../../types';
import {
  getErrorMessage
} from '../../util';

import ErrorStack from './error-stack';

const ScErrorDisplay = styled.div`
  padding: 1.6em;
`;
const ScErrorHeader = styled.h1`
  margin: 0;
  font-size: 1.8em;
  font-weight: 400;
  line-height: 1.25;
`;

export default function ErrorDisplay({
  error,
  componentStack,
  ownerStack
}: IErrorCaught): ReactElement {
  return <ScErrorDisplay>
    <ScErrorHeader>💥 {getErrorMessage(error)}</ScErrorHeader>
    <ErrorStack title="Ownder Stack" stack={ownerStack} />
    <ErrorStack title="Component Stack" stack={componentStack} />
    <ErrorStack title="Error Stack" stack={(error as Error | undefined)?.stack} />
  </ScErrorDisplay>;
}
