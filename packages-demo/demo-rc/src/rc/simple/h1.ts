import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h1`
  ${CSS_HEADING};
  font-size: 18px;
  line-height: 2;
  
  &::before {
    content: 'H1';
    background-color: hsl(0 57% 47%);
  }
`;
