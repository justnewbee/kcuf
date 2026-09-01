import {
  ReactElement
} from 'react';

import {
  H2,
  Alert,
  P,
  List
} from '@kcuf/demo-rc';

import {
  ButtonSpinBorder
} from '../../src';

export default function StoryButton(): ReactElement {
  return <>
    <H2>ButtonSpinBorder - https://ladybird.org</H2>
    <P>核心原理：</P>
    <List>
      <span>border: 2px solid transparent + 双 background 叠加：padding-box 层盖住内部，border-box 层露出作为边框</span>
      <span>hover 时把边框层换成 conic-gradient 锥形渐变</span>
      <span>用 CSS @property 定义 --gradient-angle 为 &lt;angle&gt;，再通过 @keyframes 从 0deg 转到 360deg，实现无限旋转流光</span>
      <span>border-radius: 999px 保证药丸形</span>
    </List>
    <Alert type="info">需黑色背景</Alert>
    <ButtonSpinBorder />
    <H2>TODO 其他按钮</H2>
  </>;
}
