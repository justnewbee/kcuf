# 组件 Props 设置规范

## pass-through

对于 Button、Input 等原生封装，需能够透传所有的 HTML attributes。

## 不鼓励破坏体验一致性的 Prop

比如 `Backdrop` 这种全局组件的背景色，不提供类似 `background` 等 prop。