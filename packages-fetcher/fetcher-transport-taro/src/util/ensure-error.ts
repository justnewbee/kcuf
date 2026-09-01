import _isError from 'lodash/isError';

interface ITaroPromiseReject {
  errMsg?: string;
}

export default function ensureError(err?: unknown): Error {
  if (!err) {
    return new Error();
  }
  
  if (_isError(err)) {
    return err;
  }
  
  if (typeof err === 'string') {
    return new Error(err);
  }
  
  return new Error((err as ITaroPromiseReject).errMsg || err.toString()); // eslint-disable-line @typescript-eslint/no-base-to-string
}
