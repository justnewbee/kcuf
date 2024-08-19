import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h3`
  ${CSS_HEADING};
  font-size: 14px;
  
  &::before {
    content: 'H3';
    background-color: hsl(60 100% 50%);
    color: hsl(0 0% 20%);
    
    .theme-dark & {
      background-color: hsl(60 100% 43%);
    }
  }
`;