# @/pkg/helper-geometry

> 几何算法辅助

参考：

| lib | npm | git | 说明 |
| --- | --- | --- | --- |
| [@turf/turf](https://turfjs.org) | [npm](https://www.npmjs.com/package/@turf/turf) | [git](https://github.com/Turfjs/turf) | A modular geospatial engine written in JavaScript |
| [@mathigon/euclid](https://mathigon.io/euclid) | [npm](https://www.npmjs.com/package/@mathigon/euclid) | [git](https://github.com/mathigon/euclid.js) | A Typescript library for 2D geometry |
| **2d-geometry** | [npm](https://www.npmjs.com/package/2d-geometry) | [git](https://github.com/romgrk/2d-geometry) | A fork of flatten-js focused on performance, ergonomics and Typescript |
| **flatten-js** | [npm](https://www.npmjs.com/package/flatten-js) | [git](https://github.com/alexbol99/flatten-js) | A Javascript library for 2d geometry |
| **@markroland/path-helper** | [npm](https://www.npmjs.com/package/@markroland/path-helper) | [git](https://github.com/markroland/path-helper) | A variety of methods to assist with performing operations on multi-point paths (polylines) |

## 各模块说明

`src/helper` 下各模块作用及依赖关系，需避免循环依赖

| 模块 | 作用 | 依赖 |
| --- | --- | --- |
| `measurement` | 长度、面积、中心、边缘等 | - |
| `comparison` | 比较、是否等效 | `measurement` |
| `mutation` | 修改传入数据 | `comparison` |
| `relation` | 投影、相交、平行、共线等关系 | `measurement`、`comparison` |