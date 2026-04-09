import {
  ELoadingStatus
} from '../enum';

type TSetWlData<T> = (data: T) => void;
type TSetWlLoading = (loading: ELoadingStatus) => void;
type TSetWlError = (error: Error | null) => void;

/**
 * 最普通的单点更新，以下为对应 reducer 写法（使用 immer）
 *
 * ```ts
 * function reduceSetWlLoading(state: IModelState, payload: LoadingStatus): IModelState {
 *   return produce(state, draft => {
 *     draft.withLoading.loading = payload;
 *   });
 * }
 *
 * function reduceSetWlData(state: IModelState, payload: TWithLoadingData): IModelState {
 *   return produce(state, draft => {
 *     draft.withLoading.data = payload;
 *   });
 * }
 *
 * function reduceSetWlError(state: IModelState, payload: Error | null): IModelState {
 *   return produce(state, draft => {
 *     draft.withLoading.error = payload;
 *   });
 * }
 * ```
 */
export default function takePromiseWithLoading<T>(promise: Promise<T>, setWlData: TSetWlData<T>, setWlLoading: TSetWlLoading, setWlError: TSetWlError): void {
  setWlLoading(ELoadingStatus.LOADING);
  
  promise.then(data => {
    setWlLoading(ELoadingStatus.SUCCESS);
    setWlData(data);
    setWlError(null);
  }).catch((err: unknown) => {
    setWlLoading(ELoadingStatus.ERROR);
    setWlError(err as Error);
  });
}
