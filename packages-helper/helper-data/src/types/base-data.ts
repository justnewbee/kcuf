// 基础类型 mixin，用于继承，统一前缀 BaseData

/**
 * 「ID」标准化
 */
export interface IBaseDataId {
  id: string;
}

/**
 * 「父 ID」标准化
 */
export interface IBaseDataParentId {
  parentId: string;
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
 * 「描述」标准化
 */
export interface IBaseDataDescription {
  description: string;
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
export interface IBaseDataTimeUpdated {
  timeUpdated: Date;
}

/**
 * timeCreated + timeUpdated
 */
export interface IBaseDataTimes extends IBaseDataTimeCreated, IBaseDataTimeUpdated {}

/**
 * 「创建人」标准化
 */
export interface IBaseDataCreator {
  creator: IBaseDataIdName;
}

/**
 * 「更新人」标准化
 */
export interface IBaseDataUpdater {
  updater: IBaseDataIdName;
}
