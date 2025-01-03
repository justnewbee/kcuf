export type TCenter = [number, number];

export interface IPathOptions {
  center: TCenter;
  radius: number;
  rotate?: number; // 旋转度数（非弧度）
}

export interface IPathPolygonOptions extends IPathOptions {
  vertices: number; // 顶点数，≥ 4
}

export interface IPathStarOptions extends IPathOptions {
  vertices: number; // 顶点数，≥ 4
  innerRatio?: number;
}
