# @kcuf-hook/use-route-query

将页面或组件所需状态记录在 URL 参数 `_` 上（默认为 `_`，可自定义）。

## Features

* 参数修改，不会影响到 `SearchParams` 里的其他参数
* 可自定义 `key`，这样，页面上可以有多个组件同时修改自己的参数，而不会相互影响
* 使用 JSON5 + Base64 进行编解码，是参数更小且保证类型正确
* 默认参数不会被写入 URL，进一步精简 URL 参数

## How to Use

第一步：定义 `useQuery`，给定类型和默认值：

```ts
import useRouteQuery, {
  UseRouteQueryResult
} from '@kcuf-hook/use-route-query';

interface IQuery {
  p: number;
  ps: number;
  q: string;
}

const DEFAULTS: IQuery = { // 重要，请单独在外部定义，而不是在 `useRouteQuery` 的时候临时写
  p: 1,
  ps: 10,
  q: ''
};

export default function useQuery(): UseRouteQueryResult<IQuery> {
  return useRouteQuery(DEFAULTS);
}
```

第二步：使用自己的 `useQuery`：

```tsx
import useQuery from 'path/to/use-query'

function ThePagination(): UseRouteQueryResult<IQuery> {
  const [{
    p
  }, updateQuery] = useQuery();
  
  return <Pagination {...{
    // ...
    page: p,
    pageSize: ps,
    onChange: (page, pageSize) => updateQuery({
      p: page,
      ps: pageSize
    })
  }} />;
}

function TheSearch(): UseRouteQueryResult<IQuery> {
  const [{
    q
  }, updateQuery] = useQuery();
  
  return <Search {...{
    defaultValue: q,
    onChange: keyword => updateQuery({
      q: keyword,
      p: 1
    }) // 默认在当前路由下，若期望跳到新的路由，可以带上第二个参数 `pathname`
  }} />;
}
```
