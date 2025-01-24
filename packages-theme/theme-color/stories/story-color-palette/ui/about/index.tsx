import {
  ReactElement
} from 'react';

import {
  P,
  List
} from '@kcuf/demo-rc';

export default function About(): ReactElement {
  return <>
    <P>色相 Hue / 饱和度 Saturation / 明度 Lightness：</P>
    <List>
      <><em>Hue</em>（以下横轴）360º 色相，默认每 10º 为一个节点，基础色相共 36 阶</>
      <><em>Saturation</em>（XConsole 只选 6 阶，每隔 20%）饱和度范围 0%-100%，默认所有颜色 100% 饱和度</>
      <><em>Lightness</em>（以下纵轴）明度参数 0%-100%，起始为 19%，以 10% 递增，最高 89%，共 8 阶</>
    </List>
  </>;
}
