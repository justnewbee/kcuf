import {
  useMemo
} from 'react';

import {
  EButtonPreset
} from '../enum';
import {
  IButtonPropsCustom,
  IPropsDom
} from '../types';
import {
  getButtonTitle,
  getButtonHrefTarget,
  getButtonAriaLabel
} from '../util';

import useModelProps from './_use-model-props';

export default function usePropsCustomAndDom(): [IButtonPropsCustom, IPropsDom] {
  const props = useModelProps();
  
  return useMemo((): [IButtonPropsCustom, IPropsDom] => {
    const {
      children,
      component,
      label,
      title,
      loading,
      iconStart,
      iconEnd,
      preset = EButtonPreset.TERTIARY,
      size,
      textAlign,
      fluid,
      active,
      ...rest
    } = props;
    
    const propsCustom: IButtonPropsCustom = {
      component,
      label: label || children as IButtonPropsCustom['label'],
      title,
      loading,
      iconStart,
      iconEnd,
      preset,
      size,
      textAlign,
      fluid,
      active
    };
    const propsDom: IPropsDom = {
      ...rest,
      title: getButtonTitle(propsCustom.title, propsCustom.label)
    };
    
    propsDom['aria-label'] = getButtonAriaLabel(propsDom['aria-label'], propsDom.title, propsCustom.label);
    
    // loading 或 disabled 状态下不能有点击和链接
    if (propsDom.disabled || loading) {
      delete propsDom.href;
      delete propsDom.target;
      delete propsDom.download;
      delete propsDom.onClick;
    }
    
    if (propsDom.href) { // 保证有 href 且非 disabled 状态下一定是 a，以及外链默认 target blank
      propsDom.target = getButtonHrefTarget(propsDom.href, propsDom.target);
      propsCustom.component = 'a';
    }
    
    return [propsCustom, propsDom];
  }, [props]);
}
