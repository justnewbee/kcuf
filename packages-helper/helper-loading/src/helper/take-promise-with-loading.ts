import {
  ELoadingStatus
} from '../enum';

type TSetWlData<T> = (data: T) => void;
type TSetWlLoading = (loading: ELoadingStatus) => void;
type TSetWlError = (error: Error | null) => void;

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
