import _chunk from 'lodash/chunk';

import {
  ISlsLogPayload,
  ISlsPipeOptions,
  TLogSender
} from '../types';
import {
  getSilentCountdown,
  buildPostBody
} from '../util';

/**
 * SLS 日志管道，用于在一定的时间内积压日志，以避免造成业务请求性能问题
 */
export default class SlsPipe {
  private readonly sender: TLogSender;
  private readonly options: ISlsPipeOptions;
  private queue: ISlsLogPayload[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private silent = false;
  
  constructor(sender: TLogSender, options: ISlsPipeOptions) {
    this.sender = sender;
    this.options = options;
    
    const silentCountdown = getSilentCountdown(options.silentTime);
    
    if (silentCountdown > 0) {
      this.silent = true;
      
      setTimeout(() => {
        this.silent = false;
        this.clearQueue();
      }, silentCountdown);
    }
  }
  
  /**
   * 将日志推入队列，并通知发送
   */
  pipe(payload: ISlsLogPayload, instant?: boolean): void {
    if (instant) { // 即时发送
      this.sendLogs([payload]);
      
      return;
    }
    
    this.queue.push(payload);
    this.signalSend();
  }
  
  private signalSend(): void {
    if (!this.queue.length || this.silent) {
      return;
    }
    
    this.refreshTimer();
  }
  
  /**
   * 真正发送日志
   */
  private sendLogs(payloads: ISlsLogPayload[]): void {
    const {
      options: {
        trackUrl,
        apiVersion,
        maxChunk
      }
    } = this;
    
    _chunk(payloads, maxChunk).forEach(v => {
      const body = JSON.stringify(buildPostBody(v)); // buildPostBody 可以保证外边不会出 JSON 错误
      
      this.sender(trackUrl, body, {
        'Content-Type': 'application/json',
        // 'x-log-compresstype': 'lz4'
        'x-log-apiversion': apiVersion,
        'x-log-bodyrawsize': String(body.length)
      });
    });
  }
  
  /**
   * 把队列中的日志全部发送并重置队列
   */
  private clearQueue(): void { // 必须是箭头函数，可以脱离 this
    this.clearTimer();
    this.sendLogs(this.queue);
    this.queue = [];
  }
  
  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  
  private refreshTimer(): void {
    this.clearTimer();
    this.timer = setTimeout(() => this.clearQueue(), this.options.waitTime);
  }
}
