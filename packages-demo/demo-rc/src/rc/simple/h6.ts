import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h6`
  ${CSS_HEADING};
  font-size: 12px;
  
  &::before {
    content: 'H6';
    background-color: hsl(258 100% 26%);
  }
`;
