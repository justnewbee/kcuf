import styled from 'styled-components';

import TagBase from '../tag-base';

export default styled(TagBase)`
  background: hsl(325 74% 44% / 7%);
  color: hsl(325 74% 44%);
  
  &::before {
    content: 'readonly';
  }
  
  html[data-theme="dark"] & {
    background: hsl(325 74% 44% / 17%);
    color: hsl(326 80% 64%);
  }
`;
