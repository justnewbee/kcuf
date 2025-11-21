# @kcuf/asset-loader

Asset loaders for JS/CSS/Image.

* `loadJs(url: string, options?: LoadJsOptions): Promise<void>;`
* `loadJsT<O extends object, K extends keyof O>(url: string, globalName: K, options?: LoadJsOptions): Promise<O[K]>;`
* `loadCss(url: string): void;`
* `loadImage(url: string): Promise<HTMLImageElement>;`
* `loadAssets(urls: string[]): void;`

## Features

* 有并发保护的 `loadJs`
* 类型安全的 `loadJsT`