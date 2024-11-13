// 基础类型 mixin，用于继承，统一前缀 BaseData

/**
 * 「ID」标准化
 */
export interface IBaseDataId {
  id: string;
}

/**
 * 「名称」标准化
 */
export interface IBaseDataName {
  name: string;
}

/**
 * 「标题」标准化
 */
export interface IBaseDataTitle {
  title: string;
}

/**
 * 「内容」标准化
 */
export interface IBaseDataContent {
  content: string;
}

/**
 * id + name
 */
export interface IBaseDataIdName extends IBaseDataId, IBaseDataName {}

/**
 * 「创建时间」标准化
 */
export interface IBaseDataTimeCreated {
  timeCreated: Date;
}

/**
 * 「更新时间」标准化
 */
export interface IBaseDataTimeModified {
  timeModified: Date;
}

/**
 * timeCreated + timeModified
 */
export interface IBaseDataTimes extends IBaseDataTimeCreated, IBaseDataTimeModified {}
