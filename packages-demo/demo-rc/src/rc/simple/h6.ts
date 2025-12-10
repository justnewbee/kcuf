import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h6`
  font-size: 12px;
  line-height: 2.4;
  ${CSS_HEADING}
  
  &::before {
    content: 'H6';
    background-color: hsl(258 100% 26%);
  }
`;
