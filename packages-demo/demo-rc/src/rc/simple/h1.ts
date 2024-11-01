import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h1`
  ${CSS_HEADING};
  line-height: 2;
  font-size: 18px;
  
  &::before {
    content: 'H1';
    background-color: hsl(0 100% 50%);
    
    .theme-dark & {
      background-color: hsl(0 100% 43%);
    }
  }
`;