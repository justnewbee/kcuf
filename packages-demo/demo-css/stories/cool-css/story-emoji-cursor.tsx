import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScEmojiCursor = styled.button`
  padding: 1rem;
  background-color: hsl(240 10% 4%);
  border: 0;
  border-radius: 8px;
  color: hsl(0 0% 100%);
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🪶</text></svg>") 0 20, auto;
`;

// 参考自 https://qwik.dev/
export default function StoryEmojiCursor(): ReactElement {
  return <ScEmojiCursor>
    I have cursor of emoji
  </ScEmojiCursor>;
}
