import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  JSDOM,
  DOMWindow
} from 'jsdom';

import hijackClickGlobal, {
  ClickHijacker,
  hijackClickInDom
} from '../src';
import {
  DATA_NAME_IGNORE,
  GLOBAL_CLICK_HIJACKERS
} from '../src/const';

describe('click-hijacker', () => {
  let dom: JSDOM;
  let document: Document;
  let window: DOMWindow;
  
  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html lang="en"><body></body></html>', {
      url: 'http://localhost'
    });
    window = dom.window;
    document = window.document;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global.window = window;
    global.document = document;
    GLOBAL_CLICK_HIJACKERS.length = 0;
  });
  
  afterEach(() => {
    vi.clearAllMocks();
    GLOBAL_CLICK_HIJACKERS.length = 0;
  });
  
  describe('hijackClickGlobal', () => {
    it('should register and return an unregister function', () => {
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback: vi.fn<() => void>()
      };
      
      const unregister = hijackClickGlobal(hijacker);
      
      expect(typeof unregister).toBe('function');
    });
    
    it('should add hijacker to the global list', () => {
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback: vi.fn<() => void>()
      };
      
      hijackClickGlobal(hijacker);
      expect(GLOBAL_CLICK_HIJACKERS).toContain(hijacker);
    });
    
    it('should not register the same hijacker twice', () => {
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback: vi.fn<() => void>()
      };
      
      hijackClickGlobal(hijacker);
      hijackClickGlobal(hijacker);
      
      const count = GLOBAL_CLICK_HIJACKERS.filter(h => h === hijacker).length;
      
      expect(count).toBe(1);
    });
    
    it('should remove hijacker when unregister is called', () => {
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback: vi.fn<() => void>()
      };
      
      const unregister = hijackClickGlobal(hijacker);
      
      unregister();
      
      expect(GLOBAL_CLICK_HIJACKERS).not.toContain(hijacker);
    });
    
    it('should handle ignore attribute', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      button.setAttribute(DATA_NAME_IGNORE, '');
      document.body.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should call condition with element and event', () => {
      const condition = vi.fn(() => true);
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition,
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      button.click();
      
      expect(condition).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(condition.mock.calls[0]?.[0]).toBe(button);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(condition.mock.calls[0]?.[1]).toBeInstanceOf(window.PointerEvent);
    });
    
    it('should call callback when condition returns truthy', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker<string> = {
        condition: () => 'result',
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      button.click();
      expect(callback).toHaveBeenCalledWith('result', button);
    });
    
    it('should not call callback when condition returns falsy', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => false,
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should respect ignore function', () => {
      const callback = vi.fn<() => void>();
      const ignore = vi.fn(() => true);
      const hijacker: ClickHijacker = {
        condition: () => true,
        ignore,
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      button.click();
      
      expect(ignore).toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should call preventDefault when condition is met for links', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const link = document.createElement('a');
      
      link.href = 'http://example.com';
      document.body.appendChild(link);
      
      // Patch preventDefault to track calls
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      const event = new window.PointerEvent('click', {
        bubbles: true
      });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      link.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
    
    it('should respect shouldPreventDefault false option', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback,
        shouldPreventDefault: false
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const link = document.createElement('a');
      
      link.href = 'http://example.com';
      document.body.appendChild(link);
      
      let prevented = false;
      
      link.addEventListener('click', e => {
        if (e.defaultPrevented) {
          prevented = true;
        }
      });
      
      link.click();
      expect(prevented).toBe(false);
    });
    
    it('should call stopPropagation when shouldStopPropagation is true', () => {
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback,
        shouldStopPropagation: true
      };
      
      hijackClickInDom(document.body, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      // Create and spy on event's stopPropagation
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      const event = new window.PointerEvent('click', {
        bubbles: true
      });
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      button.dispatchEvent(event);
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });
  
  describe('hijackClickInDom', () => {
    it('should register and return an unregister function', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback: vi.fn<() => void>()
      };
      
      const unregister = hijackClickInDom(container, hijacker);
      
      expect(typeof unregister).toBe('function');
    });
    
    it('should handle clicks within the container', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).toHaveBeenCalled();
    });
    
    it('should not handle clicks outside the container', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      document.body.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should handle nested elements within container', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: el => el.tagName === 'BUTTON',
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const wrapper = document.createElement('div');
      const button = document.createElement('button');
      
      wrapper.appendChild(button);
      container.appendChild(wrapper);
      
      button.click();
      expect(callback).toHaveBeenCalled();
    });
    
    it('should traverse up to find matching element', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: el => el.classList.contains('target'),
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const wrapper = document.createElement('div');
      
      wrapper.classList.add('target');
      const inner = document.createElement('span');
      
      wrapper.appendChild(inner);
      container.appendChild(wrapper);
      
      inner.click();
      expect(callback).toHaveBeenCalledWith(true, wrapper);
    });
    
    it('should allow unregistering', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      const unregister = hijackClickInDom(container, hijacker);
      
      unregister();
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should support capture phase', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      const unregister = hijackClickInDom(container, hijacker, true);
      
      expect(typeof unregister).toBe('function');
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).toHaveBeenCalled();
    });
    
    it('should stop traversing when condition is met at element', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: el => el.tagName === 'SPAN',
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const outer = document.createElement('div');
      const inner = document.createElement('span');
      
      outer.appendChild(inner);
      container.appendChild(outer);
      
      inner.click();
      expect(callback).toHaveBeenCalledWith(true, inner);
    });
  });
  
  describe('condition result types', () => {
    it('should pass through condition result to callback', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker<string> = {
        condition: el => el.dataset.action || undefined,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      button.dataset.action = 'customAction';
      container.appendChild(button);
      
      button.click();
      expect(callback).toHaveBeenCalledWith('customAction', button);
    });
    
    it('should handle undefined condition result', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => undefined,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should handle false condition result', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => false,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).not.toHaveBeenCalled();
    });
    
    it('should handle boolean true condition result', () => {
      const container = document.createElement('div');
      
      document.body.appendChild(container);
      
      const callback = vi.fn<() => void>();
      const hijacker: ClickHijacker = {
        condition: () => true,
        callback
      };
      
      hijackClickInDom(container, hijacker);
      
      const button = document.createElement('button');
      
      container.appendChild(button);
      
      button.click();
      expect(callback).toHaveBeenCalledWith(true, button);
    });
  });
});
