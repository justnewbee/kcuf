# @kcuf/rc-icon-base

> <https://www.iconfont.cn> 辅助，用于注入 iconfont 或 webfont 并返回对应的 font 名，是写组件的好帮手，同时提供了 `IconBase` 以助理快速写组件。

## 使用 injectIconFont

### 定义 Icon 组件

你需要去 <https://www.iconfont.cn> 新建或选择一个 iconfont 项目，它会有一个固定不变的 `id` 和跟当前内容有关的 `hash`，并且可能有 Base64，都可以拿来，比如：

![Code Example](https://img.alicdn.com/imgextra/i3/O1CN01xQMgKp1syThmNp0Db_!!6000000005835-2-tps-1920-1048.png)

定义组件（参考 `@kcuf-ui/rc-icon` 的实现，核心代码 50 行左右）：

```tsx
import {
  ReactElement,
  forwardRef
} from 'react';
import styled from 'styled-components';

import IconBase, {
  IconRef,
  IconProps,
  injectIconFont
} from '@kcuf/rc-icon-base';

// 为 demo 完整，直接写这里，实际场景建议提出去
const ICON_TYPE_MAPPING = {
  loading: 'e62e',
  close: 'e612'
};

type TIconType = keyof typeof ICON_TYPE_MAPPING;

interface IIconProps extends IconProps<TIconType> {}

// https://at.alicdn.com/t/c/font_4720928_yvtln3fv7v.css
const fontFamily = injectIconFont('4720928', 'yvtln3fv7v', { // 每次更新只需更新文件中的 hash 值
  pathExtra: '/c'
});

function getIconCode(type: TIconType) {
  return `\\${ICON_TYPE_MAPPING[type] || 'e600'}`;
}

function getIconColor(type: TIconType): string | null {
  ...
}

/**
 * ConsoleBase 项目自用的图标组件
 */
function Icon({
  type,
  ...props
}: IIconProps, ref: IconRef): ReactElement {
  return <IconBase<TIconType> {...{
    ref,
    type,
    rotating: type === 'loading',
    ...props,
    fontFamily,
    getIconCode,
    getIconColor
  }} />;
}

export default forwardRef(Icon);

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
```

### 使用 Icon 组件

```tsx
import Icon from '...'; // 应用内部的或你把它发布成包

// OK
<Icon type="loading" />
<Icon type="close" />
// TS 报错
<Icon type="load" />
<Icon type="x" />
```

### 使用 WebFont 字体

WebFont 可以让你的页面展现一些设计师希望的「美妙」字体（尤其是中文字体）。

众所周知，中文字体包不像西方字体那样，它是很大的，不可能为了视觉上的美观而让浏览器加载全量的中文字体包。

iconfont 网站提供了 [webfont](https://www.iconfont.cn/webfont) 的功能，你可以根据设计师给的文案去上边「定制」你要的字体。

假设，设计师要展示这样的文案：

![WebFont Example](https://img.alicdn.com/imgextra/i1/O1CN01KKpw4f1mkqDbsPutl_!!6000000004993-2-tps-852-82.png)

### 定义 WebFont 组件

你这么做：

![Copy Id](https://img.alicdn.com/imgextra/i2/O1CN01Ml8SDd238ggwXhb9E_!!6000000007211-2-tps-905-556.png)

```tsx
import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  injectWebFont
} from '@kcuf/rc-icon-base';

const fontFamily = injectWebFont('kygag0sd8g');

// 如果有其他的样式要求，也可以在这里加，或者在它的容器上加也行
const ScMengziKongzi = styled.span`
  font-family: ${fontFamily}, sans-serif;
`;

export default function MengziKongzi(): ReactElement {
  return <ScMengziKongzi>孔子曰：中午不睡，下午崩溃！孟子曰：孔子说的对！</ScMengziKongzi>;
}
```

### 使用 WebFont 组件

```tsx
import React from 'react';

import MengziKongzi from 'path/to/mengzi-kongzi'; // 一般在引用内部，没有意义发布成包

// 任何需要此组件的地方
<MengziKongzi />
```
