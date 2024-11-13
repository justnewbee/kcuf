import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h2`
  ${CSS_HEADING};
  line-height: 2.2;
  font-size: 16px;
  
  &::before {
    content: 'H2';
    background-color: hsl(28 100% 50%);
    
    .theme-dark & {
      background-color: hsl(23 100% 43%);
    }
  }
`;
