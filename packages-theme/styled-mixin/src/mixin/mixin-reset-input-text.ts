import {
  css
} from 'styled-components';

export default css`
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  transition: all ease-in-out 0.3s;
  
  &::-ms-clear {
    display: none;
  }
`;
