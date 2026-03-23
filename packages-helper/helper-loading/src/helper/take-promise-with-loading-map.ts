import {
  ELoadingStatus
} from '../enum';

type TSetWlmData<T> = (key: string, data: T) => void;
type TSetWlmLoading = (key: string, loading: ELoadingStatus) => void;
type TSetWlmError = (key: string, error: Error | null) => void;

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
