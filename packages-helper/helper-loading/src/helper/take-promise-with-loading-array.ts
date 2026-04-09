import {
  ELoadingStatus
} from '../enum';

type TSetWlaData<T> = (index: number, data: T) => void;
type TSetWlaLoading = (index: number, loading: ELoadingStatus) => void;
type TSetWlaError = (index: number, error: Error | null) => void;

/**
 * 更新 WithLoading 数组，以下为对应 reducer 写法（使用 immer）
 *
 * ```ts
 * function reduceSetWlaLoading(state: IModelState, [index, loading]: [number, LoadingStatus]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingArray[index];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingArray[index] = withLoading;
 *     }
 *
 *     withLoading.loading = loading;
 *   });
 * }
 *
 * function reduceSetWlaData(state: IModelState, [index, url]: [number, TWithLoadingArrayData]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingArray[index];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingArray[index] = withLoading;
 *     }
 *
 *     withLoading.data = url;
 *   });
 * }
 *
 * function reduceSetWlaError(state: IModelState, [index, error]: [number, Error | null]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingArray[index];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingArray[index] = withLoading;
 *     }
 *
 *     withLoading.error = error;
 *   });
 * }
 * ```
 */
export default function takePromiseWithLoadingArray<T>(index: number, promise: Promise<T>, setWlaData: TSetWlaData<T>, setWlaLoading: TSetWlaLoading, setWlaError: TSetWlaError): void {
  setWlaLoading(index, ELoadingStatus.LOADING);
  
  promise.then(data => {
    setWlaLoading(index, ELoadingStatus.SUCCESS);
    setWlaData(index, data);
    setWlaError(index, null);
  }).catch((err: unknown) => {
    setWlaLoading(index, ELoadingStatus.ERROR);
    setWlaError(index, err as Error);
  });
}
