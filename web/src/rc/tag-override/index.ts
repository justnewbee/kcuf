import styled from 'styled-components';

import TagBase from '../tag-base';

export default styled(TagBase)`
  background: hsl(40 93% 83% / 50%);
  color: hsl(24 83% 40%);
  
  &::before {
    content: 'override';
  }
  
  html[data-theme="dark"] & {
    background: hsl(22 70% 28% / 50%);
    color: hsl(38 91% 72%);
  }
`;
