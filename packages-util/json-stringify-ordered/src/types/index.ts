export type IFnCompare = (a: ICompareObject, b: ICompareObject) => -1 | 0 | 1;
 
export type IFnReplacer = (key: string | number, value: any) => any;

export interface IOptions {
  space?: string | number;
  cycles?: boolean;
  compare?: IFnCompare;
  replacer?: IFnReplacer;
}

export interface IOptionsParsed {
  space: string;
  cycles: boolean;
  compare?: IFnCompare;
  replacer?: IFnReplacer;
}

export interface ICompareObject {
  key: string;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
