import {
  ELoadingStatus
} from '../enum';

type TSetWlmData<T> = (key: string, data: T) => void;
type TSetWlmLoading = (key: string, loading: ELoadingStatus) => void;
type TSetWlmError = (key: string, error: Error | null) => void;

/**
 * 更新 WithLoading 的映射，以下为对应 reducer 写法（使用 immer）
 *
 * ```ts
 * function reduceSetWlmLoading(state: IModelState, [key, loading]: [string, LoadingStatus]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingMap[key];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingMap[key] = withLoading;
 *     }
 *
 *     withLoading.loading = loading;
 *   });
 * }
 *
 * function reduceSetWlmData(state: IModelState, [key, data]: [string, TWithLoadingMapData]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingMap[key];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingMap[key] = withLoading;
 *     }
 *
 *     withLoading.data = data;
 *   });
 * }
 *
 * function reduceSetWlmError(state: IModelState, [key, error]: [string, Error | null]): IModelState {
 *   return produce(state, draft => {
 *     let withLoading = draft.withLoadingMap[key];
 *
 *     if (!withLoading) {
 *       withLoading = createWithLoading();
 *       draft.withLoadingMap[key] = withLoading;
 *     }
 *
 *     withLoading.error = error;
 *   });
 * }
 * ```
 */
export default function takePromiseWithLoadingMap<T>(key: string, promise: Promise<T>, setWlmData: TSetWlmData<T>, setWlmLoading: TSetWlmLoading, setWlmError: TSetWlmError): void {
  setWlmLoading(key, ELoadingStatus.LOADING);
  
  promise.then(data => {
    setWlmLoading(key, ELoadingStatus.SUCCESS);
    setWlmData(key, data);
    setWlmError(key, null);
  }).catch((err: unknown) => {
    setWlmLoading(key, ELoadingStatus.ERROR);
    setWlmError(key, err as Error);
  });
}
