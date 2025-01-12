import styled from 'styled-components';

export default styled.span`
  display: inline-block;
  margin-inline-end: 8px;
  padding-inline: 7px;
  background: hsl(336 100% 97%);
  border-radius: 4px;
  box-sizing: border-box;
  color: hsl(325 74% 44%);
  font-size: 0.85em;
  
  &::after {
    content: 'required';
    font-variant: all-small-caps;
    letter-spacing: 0.05rem;
  }
`;
