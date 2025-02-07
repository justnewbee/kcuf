# @kcuf/react-router-link-hijacker

## Why

[react-router](https://reactrouter.com) 提供了多种 [navigate](https://reactrouter.com/start/library/navigating) 的方案：

* `<Link>`
* `<NavLink>`
* `useNavigate`

然都不是很便利。

我们通常会使用封装的可接收 `href` 的 `Button` 或其他类似组件作为有样式的链接载体，或者在某些场景下，不便使用 `react-router`，比如封装可复用组件，需要避免依赖 `react-router`。 这么做的后果就是丢失了路由特性，变成了点击后直接刷新整个页面，造成了不好的用户体验。

如果使用 `react-router` 提供的组件，又需要适配样式，没有合适的方案的时候，在适配按钮的时候会比较麻烦，写过 `Button` 组件的都知道，小小基础组件，门道很多，开发体验会很差。

于是，很多时候就会用 `useNavigate`，多数人的做法直接使用非链接 DOM，这样会造成用户无法预知点击的后果，但若用链接，又需要阻止链接的默认行为，还要考虑不能忽略传入的 `onClick`，且写一处类似的功能加一处，开发体验仍然不好。

`useNavigate` 的另一个问题是不会判断当前路由，同一个链接点击多次，会在浏览器历史中添加多个重复项，导致退到真正的「上一个」路由，也要多次。

为了兼顾开发体验和用户体验，你需要这个组件。

## How to Use

### 引入组件

> 注意：全局只使用一次该组件。

```tsx
import ReactRouterClickHijacker from '@kcuf/react-router-link-hijacker';

// 在应用的 Router 顶层加上，that easy
<ReactRouterClickHijacker />
```

### 修改已有代码

* 清理使用 `<Link>`、`<NavLink>`，用纯 `a` 或其他组件
* 清理使用 `useNavigate` 的点击事件，并修改对应的 DOM，转换为链接

## FAQ

## ❓ 不期望被当成路由链接怎么办？

默认情况下，用户按住 `Meta` 键点击（Win `Ctrl`、Mac `Cmd`），并且以下链接不会被当成路由：

1. 外链
2. 带 `target` 属性（不论值）
3. 带 `download` 属性（下载链接）
4. 带 `data-route-not` 属性

以上情况，链接的行为如同原生。

## ❓ 如何 `replace` 而非 `push`？

加上 `data-route-replace` 属性。

## ❓ `NavLink` 的 `active` 状态怎么搞？

如果你用了 `NavLink`，且依赖其 `.active` 做样式，可以使用 `matchPath`。

```ts
const {
  pathname
} = useLocation();

const active = !!matchPath(SOME_PATH, pathname);
```