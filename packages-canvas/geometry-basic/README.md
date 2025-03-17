# @/pkg/helper-geometry

> 几何算法辅助

参考：

| lib | 说明 |
| --- | --- |
| [@turf/turf](https://turfjs.org) [npm](https://www.npmjs.com/package/@turf/turf) [git](https://github.com/Turfjs/turf) | A modular geospatial engine written in JavaScript |
| [@mathigon/euclid](https://mathigon.io/euclid) [npm](https://www.npmjs.com/package/@mathigon/euclid) [git](https://github.com/mathigon/euclid.js) | A Typescript library for 2D geometry |
| **2d-geometry** [npm](https://www.npmjs.com/package/2d-geometry) [git](https://github.com/romgrk/2d-geometry) | A fork of flatten-js focused on performance, ergonomics and Typescript |
| [flatten-js](https://alexbol99.github.io/flatten-js/index.html) [npm](https://www.npmjs.com/package/flatten-js) [git](https://github.com/alexbol99/flatten-js) | A Javascript library for 2d geometry |
| **@markroland/path-helper** [npm](https://www.npmjs.com/package/@markroland/path-helper) [git](https://github.com/markroland/path-helper) | A variety of methods to assist with performing operations on multi-point paths (polylines) |

## 各模块说明

保证 `src/helper` 下各模块依赖关系为下方依赖上方，避免循环依赖：

* `base` 基础，获取形状原信息
* `angle` 角
* `comparison` 比较
* `relation` 关系
* `transform` 变化（选择、移动等）
* `mutation` 修改
* `slicing` 切割
* `justify` 矫正
* `misc` 杂项
