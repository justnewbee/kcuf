export interface IMergingOptions {
  /**
   * 默认用 FetcherConfig._id，也可以自己指定（不推荐自己指定）
   */
  key?: string;
}

export interface IMergingOptionsParsed extends Required<IMergingOptions> {}