import {
  ReactElement
} from 'react';
import {
  createGlobalStyle
} from 'styled-components';

import {
  useStateDark
} from '../../model';

const GlobalStyleDarkBg = createGlobalStyle`
  :root {
    --shadow-color-block: 0 0 2px hsla(0 0% 100% / 40%);
  }
  
  body {
    background: #000;
    color: #fff;
  }
`;

export default function GlobalStyle(): ReactElement | null {
  const [dark] = useStateDark();
  
  return dark ? <GlobalStyleDarkBg /> : null;
}
