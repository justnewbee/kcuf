export interface IMergingQueueItem {
  resolve(data: unknown): void;
  reject(err: Error): void;
}

export type TMergingGlobal = Record<string, IMergingQueueItem[]>;

export interface IMergingParsed {
  key: string;
}
