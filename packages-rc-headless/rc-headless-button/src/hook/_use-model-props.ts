import {
  useMemo
} from 'react';

import {
  EButtonVariant
} from '../enum';
import {
  IPropsCustom,
  IPropsDom
} from '../types';
import {
  getButtonTitle,
  getButtonHrefTarget,
  getButtonAriaLabel
} from '../util';

import useModelContext from './_use-model-context';

export default function useModelProps(): [IPropsCustom, IPropsDom] {
  const {
    props
  } = useModelContext();
  
  return useMemo((): [IPropsCustom, IPropsDom] => {
    const {
      component,
      label,
      title,
      loading,
      iconSpacing,
      iconLeft,
      iconRight,
      theme = EButtonVariant.TERTIARY,
      size,
      textAlign,
      cursor,
      borderRadius = true,
      noShadow,
      block,
      active,
      classNameForIconLeft,
      classNameForIconRight,
      ...rest
    } = props;
    
    const propsCustom: IPropsCustom = {
      component,
      label,
      title,
      loading,
      iconSpacing,
      iconLeft,
      iconRight,
      theme,
      size,
      textAlign,
      cursor,
      borderRadius,
      noShadow,
      block,
      active,
      classNameForIconLeft,
      classNameForIconRight
    };
    const propsDom: IPropsDom = {
      ...rest,
      title: getButtonTitle(propsCustom.title, propsCustom.label)
    };
    
    propsDom['aria-label'] = getButtonAriaLabel(propsDom['aria-label'], propsDom.title, propsCustom.label);
    
    // loading 或 disabled 状态下不能有点击和链接
    if (propsDom.disabled || loading) {
      delete propsDom.onClick;
      delete propsDom.href;
      delete propsDom.target;
    }
    
    if (propsDom.href) { // 保证有 href 且非 disabled 状态下一定是 a，以及外链默认 target blank
      propsDom.target = getButtonHrefTarget(propsDom.href, propsDom.target);
      propsCustom.component = 'a';
    }
    
    return [propsCustom, propsDom];
  }, [props]);
}
