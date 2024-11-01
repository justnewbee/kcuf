import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h5`
  ${CSS_HEADING};
  font-size: 12px;
  
  &::before {
    content: 'H5';
    background-color: hsl(180 100% 50%);
    color: hsl(0 0% 20%);
    
    .theme-dark & {
      background-color: hsl(180 100% 43%);
    }
  }
`;
