| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `href` | `string` | No | - | - |
| `target` | `HTMLAttributeAnchorTarget` | No | - | - |
| `download` | `string \| boolean` | No | - | - |
| `component` | `"button" \| "a" \| "span" \| "div"` | No | - | 理论上 button 不能包含 button 和 a，a 不能包含 a，若视觉上有这样的场景，可用该属性 |
| `label` | `string \| ReactElement<any, string \| JSXElementConstructor<any>>` | No | - | or you can use `children` instead, but prefer this way |
| `title` | `string \| boolean` | No | - | 为 `true` 时，使用 label（如果它是 string 的话）作为 title |
| `loading` | `boolean` | No | - | 在按钮左侧展示 loading 图标，比 iconLeft 优先级高 |
| `iconSpacing` | `TButtonIconSpacing` | No | - | 定义 iconLeft、iconRight 与 label 之间的间距，默认 8，small 为 4，no 为 0 |
| `iconLeft` | `ReactElement<any, string \| JSXElementConstructor<any>> \| " "` | No | - | 左侧 Icon<br /><br />1. 如果 loading 中，渲染 Loading 图标<br />2. 如果是一个空格，则渲染一个占位（为保持图标在视觉上的垂直对齐）<br />3. 否则渲染组件 |
| `iconLeftClassName` | `string` | No | - | - |
| `iconRight` | `ReactElement<any, string \| JSXElementConstructor<any>>` | No | - | 右侧 Icon，类上 |
| `iconRightClassName` | `string` | No | - | - |
| `preset` | `"none" \| "menu" \| EButtonPreset \| "danger" \| "primary" \| "secondary" \| "secondary:alt" \| "tertiary" \| "tertiary:alt" \| "brand:primary" \| "brand:secondary" \| ... 6 more ... \| "text:brand:secondary"` | No | - | - |
| `size` | `"none" \| EButtonSize \| "xs" \| "s" \| "m" \| "l" \| "xl"` | No | - | - |
| `textAlign` | `TButtonTextAlign` | No | - | a button is by default center aligned (`align` is a deprecated HTML attribute) |
| `cursor` | `string` | No | - | - |
| `borderRadius` | `boolean \| "full"` | No | - | 在有边框的时候，按钮默认会有个很小的圆角（2px），可以设置<br />- true 默认<br />- false 没有圆角<br />- 'full' 两头圆角 |
| `noShadow` | `boolean` | No | - | 去掉 hover 及 active 时的 shadow（对非 tertiary 和 text） |
| `block` | `boolean` | No | - | whether to display as a block level dom |
| `active` | `boolean` | No | - | 将状态锁定在 active |