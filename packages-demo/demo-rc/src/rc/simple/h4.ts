import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h4`
  font-size: 12px;
  line-height: 2.4;
  ${CSS_HEADING}
  
  &::before {
    content: 'H4';
    background-color: hsl(45 99% 27%);
  }
`;
