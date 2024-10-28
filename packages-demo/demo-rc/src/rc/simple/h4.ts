import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h4`
  ${CSS_HEADING};
  font-size: 12px;
  
  &::before {
    content: 'H4';
    background-color: hsl(120 100% 50%);
    color: hsl(0 0% 20%);
    
    .theme-dark & {
      background-color: hsl(120 100% 43%);
    }
  }
`;
