import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h4`
  ${CSS_HEADING};
  font-size: 12px;
  
  &::before {
    content: 'H4';
    background-color: hsl(45 99% 27%);
  }
`;
