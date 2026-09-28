// 插件开关，除了说明的默认开
export interface IPlugins {
  cursor?: boolean;
  tooltip?: boolean;
  magnet?: boolean;
  snapping?: boolean;
  zoom?: boolean;
  move?: boolean;
  stats?: boolean; // 默认 false
  fps?: boolean; // 默认 false
}
