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

import useModelContext from './_use-model-context';

export default function useModelProps(): [IButtonPropsCustom, IPropsDom] {
  const {
    props
  } = useModelContext();
  
  return useMemo((): [IButtonPropsCustom, IPropsDom] => {
    const {
      children,
      component,
      label,
      title,
      loading,
      iconSpacing,
      iconLeft,
      iconRight,
      preset = EButtonPreset.TERTIARY,
      size,
      textAlign,
      cursor,
      borderRadius = true,
      noShadow,
      fluid,
      active,
      iconLeftClassName,
      iconRightClassName,
      ...rest
    } = props;
    
    const propsCustom: IButtonPropsCustom = {
      component,
      label: label || children as IButtonPropsCustom['label'],
      title,
      loading,
      iconSpacing,
      iconLeft,
      iconRight,
      preset,
      size,
      textAlign,
      cursor,
      borderRadius,
      noShadow,
      fluid,
      active,
      iconLeftClassName,
      iconRightClassName
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
