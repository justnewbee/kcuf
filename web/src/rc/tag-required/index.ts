import styled from 'styled-components';

import TabBase from '../tab-base';

export default styled(TabBase)`
  background: hsl(325 74% 44% / 7%);
  color: hsl(325 74% 44%);
  
  &::before {
    content: 'required';
  }
  
  html[data-theme="dark"] & {
    background: hsl(325 74% 44% / 17%);
    color: hsl(326 80% 64%);
  }
`;
