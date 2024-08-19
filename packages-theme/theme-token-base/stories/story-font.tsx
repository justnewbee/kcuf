import {
  ReactElement
} from 'react';

import {
  FONT_FAMILY_SANS,
  FONT_FAMILY_MONO,
  FONT_SIZE,
  LINE_HEIGHT,
  LINE_HEIGHT_HEADING
} from '../src';

export default function StoryFont(): ReactElement {
  return <>
    <div style={{
      fontFamily: FONT_FAMILY_SANS
    }}>无衬线字体：&quot;中文 English 1234567890-=？！。，：；?!.,:;&lt;&gt;《》()（）[]【】{'{}'}「」『』&apos; 💥 🐌 ⛺ ✅ 🪶 ⁉️&quot;</div>
    <div style={{
      fontFamily: FONT_FAMILY_MONO
    }}>等宽字体：`const fontFamily = MONO;`</div>
    {FONT_SIZE.map((v, i) => <div key={v} style={{
      fontSize: v,
      lineHeight: LINE_HEIGHT[i]
    }}>font-size {v} + line-height {LINE_HEIGHT[i]}</div>)}
    {FONT_SIZE.map((v, i) => <div key={v} style={{
      fontSize: v,
      lineHeight: LINE_HEIGHT_HEADING[i]
    }}>font-size {v} + line-height {LINE_HEIGHT_HEADING[i]}</div>)}
  </>;
}