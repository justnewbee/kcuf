import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScGradientBorder = styled.div`
  padding: 1em;
  border: 2px solid #eee;
  border-image: linear-gradient(45deg, #ee6e6e, #169f48, #c78c06, #598bff) 1;
`;

// 参考自 https://www.benji.dog
export default function StoryGradientBorder(): ReactElement {
  return <ScGradientBorder>
    I am a container with gradient borders
  </ScGradientBorder>;
}
