import styled from 'styled-components';

export default styled.hr`
  margin: 12px 0;
  padding: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, hsl(0 0% 90%) 25%, hsl(0 0% 90%) 75%, transparent 100%);
  border: 0;
  
  .theme-dark & {
    background: linear-gradient(90deg, transparent 0%, hsl(0 0% 20%) 25%, hsl(0 0% 20%) 75%, transparent 100%);
  }
`;
