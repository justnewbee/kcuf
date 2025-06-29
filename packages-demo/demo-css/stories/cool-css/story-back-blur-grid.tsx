import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScStoryBackTextBlur = styled.div`
  position: relative;
  border: 1px solid #999;
`;

const ScCover = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(transparent 1px, #fff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
`;
const ScText = styled.div`
  padding: 20px;
`;

// 参考自 https://element-plus.org 的顶栏样式
export default function StoryBackBlurGrid(): ReactElement {
  return <ScStoryBackTextBlur>
    <ScCover />
    <ScText>这里的文字将被虚化成栅格（其实图片什么的也会）</ScText>
  </ScStoryBackTextBlur>;
}
