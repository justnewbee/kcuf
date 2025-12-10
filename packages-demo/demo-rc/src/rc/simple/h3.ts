import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h3`
  font-size: 14px;
  line-height: 2.4;
  ${CSS_HEADING}
  
  &::before {
    content: 'H3';
    background-color: hsl(197 76% 32%);
  }
`;
