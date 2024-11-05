/**
 * 分页参数标准化
 */
export interface IBaseParamsPage {
  page?: number;
  pageSize?: number;
}

/**
 * 带关键词的分页参数标准化
 */
export interface IBaseParamsPageWithQ extends IBaseParamsPage {
  q?: string; // 前端「搜素关键字」参数统一为 q
}