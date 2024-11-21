import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h3`
  ${CSS_HEADING};
  font-size: 14px;
  
  &::before {
    content: 'H3';
    background-color: hsl(197 76% 32%);
  }
`;
