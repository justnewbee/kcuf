import {
  css
} from 'styled-components';

export default css`
  background-color: transparent;
  border: 1px solid transparent;
  box-sizing: border-box;
  outline: none;
  transition: all ease-in-out 0.3s;
  
  &::-ms-clear {
    display: none;
  }
`;
