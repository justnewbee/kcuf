# Web

This is the documentation website for `kcuf-ui`. It is built using [Docusaurus](https://docusaurus.io/).

## Installation

```shell
pnpm -w boot # will bootstrap the workspace
```

## Local Development

```shell
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```shell
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

TODO

## FAQ

### 本地开发，Search 不生效

`pnpm start` 的情况下，搜索框会一直处于「Loading」状态，要生效需要 `pnpm build && pnpm serve`。
