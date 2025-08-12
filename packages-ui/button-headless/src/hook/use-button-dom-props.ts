import {
  useMemo
} from 'react';

import {
  IPropsDom
} from '../types';
import {
  getButtonTitle,
  getButtonHrefTarget,
  getButtonAriaLabel
} from '../util';

import useModelProps from './_use-model-props';

/**
 * 剥离出所有可应用于 DOM 上的 props
 */
export default function useButtonDomProps(): Omit<IPropsDom, 'children'> {
  const props = useModelProps();
  
  return useMemo((): Omit<IPropsDom, 'children'> => {
    const {
      children,
      label,
      component,
      title,
      loading,
      disabled,
      iconStart,
      iconEnd,
      preset,
      size,
      textAlign,
      fluid,
      active,
      ...restProps
    } = props;
    const propsDom: IPropsDom = {
      ...restProps,
      disabled,
      title: getButtonTitle(title, label || children),
      'data-fluid': fluid ? '' : undefined,
      'data-loading': loading ? '' : undefined,
      'data-disabled': disabled ? '' : undefined
    };
    
    propsDom['aria-label'] = getButtonAriaLabel(propsDom['aria-label'], propsDom.title, label || children);
    
    // loading 或 disabled 状态下不能有点击和链接
    if (loading || disabled) {
      delete propsDom.href;
      delete propsDom.target;
      delete propsDom.download;
      delete propsDom.onClick;
    }
    
    if (propsDom.href) { // 保证有 href 且非 disabled 状态下一定是 a，以及外链默认 target blank
      propsDom.target = getButtonHrefTarget(propsDom.href, propsDom.target);
    } else {
      delete propsDom.target;
      delete propsDom.download;
    }
    
    return propsDom;
  }, [props]);
}
