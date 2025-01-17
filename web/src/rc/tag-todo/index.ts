import styled from 'styled-components';

import TagBase from '../tag-base';

export default styled(TagBase)`
  background: hsl(5 100% 48% / 7%);
  color: hsl(5 95% 42%);
  
  &::before {
    content: 'TODO';
    font-weight: 600;
  }
  
  html[data-theme="dark"] & {
    background: hsl(5 100% 48% / 17%);
    color: hsl(5 92% 64%);
  }
`;
