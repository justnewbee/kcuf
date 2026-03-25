import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  IFullPageProps
} from '../types';

const ScFullPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ScLayoutHeader = styled.div`
  border-bottom: 1px solid hsl(0 0% 93%);
`;
const ScLayoutBody = styled.div`
  flex: 1;
  overflow: auto;
`;
const ScLayoutFooter = styled.footer`
  border-top: 1px solid hsl(0 0% 93%);
`;

export default function FullPage({
  header,
  children,
  footer
}: IFullPageProps): ReactElement {
  return <ScFullPage>
    {header ? <ScLayoutHeader>{header}</ScLayoutHeader> : null}
    <ScLayoutBody>{children}</ScLayoutBody>
    {footer ? <ScLayoutFooter>{footer}</ScLayoutFooter> : null}
  </ScFullPage>;
}
