import styled from 'styled-components';

import {
  CSS_HEADING
} from '../../const';

export default styled.h5`
  font-size: 12px;
  line-height: 2.4;
  ${CSS_HEADING}
  
  &::before {
    content: 'H5';
    background-color: hsl(0 57% 47%);
  }
`;
