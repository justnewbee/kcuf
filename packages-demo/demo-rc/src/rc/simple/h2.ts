import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h2`
  ${CSS_HEADING};
  font-size: 16px;
  line-height: 2.2;
  
  &::before {
    content: 'H2';
    background-color: hsl(302 57% 29%);
  }
`;
