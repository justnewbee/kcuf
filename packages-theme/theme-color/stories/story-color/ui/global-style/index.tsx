import {
  ReactElement
} from 'react';
import {
  createGlobalStyle
} from 'styled-components';

import {
  useStateDark
} from '../../model';

const GlobalStyleDark = createGlobalStyle`
  body {
    background-color: hsl(0 4% 5%);
    color: hsl(0 0% 100%);
  }
`;

export default function GlobalStyle(): ReactElement | null {
  const [dark] = useStateDark();
  
  return dark ? <GlobalStyleDark /> : null;
}
