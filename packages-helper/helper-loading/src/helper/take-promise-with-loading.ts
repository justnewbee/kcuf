import {
  ELoadingStatus
} from '../enum';

type TSetData<T> = (data: T) => void;
type TSetLoading = (loading: ELoadingStatus) => void;
type TSetError = (error: Error | null) => void;

export default function takePromiseWithLoading<T>(promise: Promise<T>, setData: TSetData<T>, setLoading: TSetLoading, setError: TSetError): void {
  setLoading(ELoadingStatus.LOADING);
  
  promise.then(data => {
    setLoading(ELoadingStatus.SUCCESS);
    setData(data);
    setError(null);
  }).catch((err: unknown) => {
    setLoading(ELoadingStatus.ERROR);
    setError(err as Error);
  });
}
