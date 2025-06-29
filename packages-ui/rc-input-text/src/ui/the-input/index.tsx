import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import InputElement from './input-element';
import InputIcon from './input-icon';

// input 有个诡异的宽度，需要一个容器限制一下（然后在 input 上设一个 width: 100%）
const ScTheInput = styled.div`
  flex: 1;
  position: relative;
`;

export default function TheInput(): ReactElement {
  return <ScTheInput>
    <InputElement />
    <InputIcon /></ScTheInput>;
}
