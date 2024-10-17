import {
  IInterceptorEject,
  IInterceptorQueueItemRequest,
  IInterceptorQueueItemResponse,
  IFetcherConfigDefault,
  IFetcherConfig,
  IFetcherResponse,
  IFetcherError,
  IFetcherErrorSkipNetwork,
  IFetcherClass,
  IFetcherInterceptRequest,
  IFetcherInterceptResponseFulfilled,
  IFetcherInterceptResponseRejected
} from '../types';
import {
  fetchX,
  mergeConfig,
  convertError,
  queueInterceptor,
  sortInterceptors
} from '../util';
import {
  interceptRequestFirst,
  interceptRequestFinal
} from '../interceptor';

/**
 * 一个允许添加 Request 和 Response 拦截器的 Fetcher 类，有些类似 axios，但有所不同：
 *
 * 1. 拦截方法更直接：`interceptRequest/interceptResponse`，而不是 `axios.interceptors.request|response.use()`
 * 2. 解除拦截只需要记住以上两个方法返回的无参方法即可（在 react 的 useEffect hooks 下特别方便），而不是 `axios.interceptors.request|response.eject()`
 * 3. `interceptRequest` 仅接受一个方法，而 `interceptResponse` 可以接受两个（跟 axios 类似）
 * 4. `interceptRequest` 的顺序和最终调用的顺序一致，而 axios 的顺序是倒着来的
 * 5. `interceptRequest` 如果抛错，不会触发真实的 API 请求（axios 一样），也不会触发任何 response interceptors（axios 会触发）
 * 6. `interceptRequest` 可以不必返回全的 `fetcherConfig`，会自动进行 merge，axios 要求返回全的
 */
export default class Fetcher implements IFetcherClass {
  private readonly defaultConfig?: IFetcherConfigDefault;
  
  private interceptorQueueRequest: IInterceptorQueueItemRequest[] = [];
  
  private interceptorQueueResponse: IInterceptorQueueItemResponse[] = [];
  
  private interceptorRequestSealed = false;
  
  private interceptorResponseSealed = false;
  
  /**
   * 传递给 interceptor，这样在 interceptor 内部有需要的话可以通过它加上 fetcherConfig 进行重新请求
   */
  private requestForInterceptor = <T>(fetcherConfig: IFetcherConfig): Promise<T> => this.request<T>({
    ...fetcherConfig,
    _byInterceptor: true
  });
  
  constructor(config?: IFetcherConfigDefault) {
    this.defaultConfig = config;
  }
  
  /**
   * 获取此次调用需要用到的所有请求拦截器，且拦截器的顺序按指定顺序
   */
  private getInterceptorRequestQueue(): IInterceptorQueueItemRequest[] {
    return [{
      onFulfilled: interceptRequestFirst
    }, ...sortInterceptors(this.interceptorQueueRequest), {
      onFulfilled: interceptRequestFinal
    }];
  }
  
  private getInterceptorResponseQueue(): IInterceptorQueueItemResponse[] {
    return sortInterceptors(this.interceptorQueueResponse);
  }
  
  /**
   * 逐个调用请求拦截器，每个拦截器可以返回部分期望修改的 fetcherConfig（也可以不返回任何东西），最终得到的是合并后完整的 fetcherConfig 对象。
   *
   * 注意，Request 拦截器是一条不会反转 Reject 的 Promise 链，即只要其中任何一环 `throw`，即表明接口失败，并且不会进行真正的接口调用，也不会
   * 进入响应拦截流程。
   */
  private invokeInterceptorQueueRequest(fetcherConfig: IFetcherConfig): Promise<IFetcherConfig> {
    let promise: Promise<IFetcherConfig> = Promise.resolve(fetcherConfig);
    
    this.getInterceptorRequestQueue().forEach(v => {
      promise = promise.then((configLastMerged: IFetcherConfig) => { // 上一次 merge 完的结果
        const {
          onFulfilled
        } = v;
        
        if (!onFulfilled) {
          return configLastMerged;
        }
        
        // 利用前置 `Promise.resolve()`，不管 onFulfilled 返回是否 Promise 都可以在一个运行空间获取到 configLastMerged 和 configToMerge
        // configToMerge 是 onFulfilled 计算后得到的结果，可能为空；也可能是 Promise
        return Promise.resolve()
            .then(() => onFulfilled(configLastMerged, this.requestForInterceptor))
            .then(configToMerge => mergeConfig(configLastMerged, configToMerge));
      });
    });
    
    return promise;
  }
  
  /**
   * 逐个调用响应拦截器，你可以在 `onFulfilled` 里转换数据或者将结果转成错误；也可以在 `onReject` 中将结果反转成成功。
   */
  private async invokeInterceptorQueueResponse<T>(fetcherConfig: IFetcherConfig, fetcherResponse?: IFetcherResponse<T>, error?: IFetcherError): Promise<T> {
    let promise: Promise<T>;
    
    if (fetcherResponse) {
      promise = Promise.resolve(fetcherResponse.data);
    } else {
      promise = Promise.reject(error);
    }
    
    // 逐个调用响应拦截器，如果有 success 则其返回将作为结果传递给下一个拦截器
    this.getInterceptorResponseQueue().forEach(v => {
      promise = promise.then((result: T) => {
        return v.onFulfilled ? v.onFulfilled(result, fetcherConfig, fetcherResponse, this.requestForInterceptor) as T : result;
      }, err => {
        const error2 = convertError(err, fetcherConfig);
        
        /**
         * 如果继续 throw 则 promise 继续 reject，如果不 throw 则 promise 将被 resolve
         * 所以这里提供了「纠错」和「调整错误」两个功能
         */
        if (v.onRejected) {
          return v.onRejected(error2, fetcherConfig, fetcherResponse, this.requestForInterceptor) as T;
        }
        
        throw error2;
      }).catch(err => {
        const error2 = convertError(err, fetcherConfig);
        
        if (fetcherResponse?.data) {
          error2.responseData = fetcherResponse.data;
        }
        
        throw error2;
      });
    });
    
    return promise;
  }
  
  interceptRequest(onFulfilled: IFetcherInterceptRequest, priority?: number): IInterceptorEject {
    if (this.interceptorRequestSealed) {
      throw new Error('[Fetcher#interceptRequest] Interceptor request is sealed. You need to unseal it first.');
    }
    
    return queueInterceptor<IInterceptorQueueItemRequest>(this.interceptorQueueRequest, {
      onFulfilled,
      priority
    });
  }
  
  /**
   * 添加「预设」响应拦截器，返回解除拦截的无参方法
   */
  interceptResponse(onFulfilled?: IFetcherInterceptResponseFulfilled, onRejected?: IFetcherInterceptResponseRejected, priority?: number): IInterceptorEject {
    if (this.interceptorResponseSealed) {
      throw new Error('[Fetcher#interceptResponse] Interceptor response is sealed. You need to unseal it first.');
    }
    
    return queueInterceptor<IInterceptorQueueItemResponse>(this.interceptorQueueResponse, {
      onFulfilled,
      onRejected,
      priority
    });
  }
  
  /**
   * 对于「开箱即用」的 Fetcher 实例，由于是会被复用的单例，一般不希望它的拦截器被扩展，如果还是坚持要扩展，需要手动解除
   */
  sealInterceptors(requestSealed = true, responseSealed = true): void {
    this.interceptorRequestSealed = requestSealed;
    this.interceptorResponseSealed = responseSealed;
  }
  
  /**
   * 发送请求：前置请求拦截器 → 网络请求 → 后置响应拦截器
   */
  async request<T = unknown>(fetcherConfig?: IFetcherConfig): Promise<T> {
    let finalConfig: IFetcherConfig = mergeConfig(this.defaultConfig, fetcherConfig);
    
    // 1. 前置请求拦截器
    try {
      finalConfig = await this.invokeInterceptorQueueRequest(finalConfig);
    } catch (err) {
      const error = convertError(err, finalConfig);
      
      if (error.name === 'FetcherSkipNetwork') { // 跳过网络请求和响应拦截器
        return (error as IFetcherErrorSkipNetwork<T>).result; // 直接返回结果
      }
      
      throw error; // 继续错下去，但不会进入请求环节
    }
    
    // 2. 网络请求
    let fetcherResponse: IFetcherResponse<T> | undefined;
    let error: IFetcherError | undefined;
    
    try {
      fetcherResponse = await fetchX<T>(finalConfig);
    } catch (err) {
      error = convertError(err, finalConfig);
    }
    
    // 3. 后置响应拦截器
    return this.invokeInterceptorQueueResponse<T>(finalConfig, fetcherResponse, error);
  }
}
