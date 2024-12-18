import styled from 'styled-components';

import {
  CSS_BLOCK_LEVEL_ELEMENT
} from '../../const';

export default styled.blockquote`
  ${CSS_BLOCK_LEVEL_ELEMENT};
  padding: 8px 16px;
  border-left: 4px solid hsl(0 0% 93%);
  color: hsl(0 0% 60%);
`;