import {
  ReactElement,
  useRef,
  useCallback
} from 'react';
import addOneClass from 'dom-helpers/addClass';
import removeOneClass from 'dom-helpers/removeClass';

import {
  ITransitionCssProps
} from './types';
import {
  forceReflow
} from './util';
import Transition from './transition';

const addClass = (node, classes) =>
  node && classes && classes.split(' ').forEach(c => addOneClass(node, c));
const removeClass = (node, classes) =>
  node && classes && classes.split(' ').forEach(c => removeOneClass(node, c));

/**
 * A transition component inspired by the excellent
 * [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
 * use it if you're using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/@kcuf-ui/transition-group/transition)
 * component, so it inherits all of its props.
 *
 * ... (rest of the comment remains unchanged)
 */
export default function TransitionCss(props: ITransitionCssProps): ReactElement {
  const appliedClassesRef = useRef({
    appear: {},
    enter: {},
    exit: {}
  });
  
  const resolveArguments = useCallback((maybeNode, maybeAppearing) =>
      props.nodeRef
        ? [props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
        : [maybeNode, maybeAppearing], // `findDOMNode` was used
    [props.nodeRef]);
  
  const getClassNames = useCallback((type) => {
    const {
      classNames
    } = props;
    const isStringClassNames = typeof classNames === 'string';
    const prefix = isStringClassNames && classNames ? `${classNames}-` : '';
    let baseClassName = isStringClassNames ? `${prefix}${type}` : classNames[type];
    let activeClassName = isStringClassNames ? `${baseClassName}-active` : classNames[`${type}Active`];
    let doneClassName = isStringClassNames ? `${baseClassName}-done` : classNames[`${type}Done`];
    
    return {
      baseClassName,
      activeClassName,
      doneClassName
    };
  }, [props.classNames]);
  
  const addClass = useCallback((node, type, phase) => {
    let className = getClassNames(type)[`${phase}ClassName`];
    const {doneClassName} = getClassNames('enter');
    
    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += ` ${doneClassName}`;
    }
    
    if (phase === 'active') {
      if (node) {
        forceReflow(node);
      }
    }
    
    if (className) {
      appliedClassesRef.current[type][phase] = className;
      addClass(node, className);
    }
  }, [getClassNames]);
  
  const removeClasses = useCallback((node, type) => {
    const {
      base: baseClassName,
      active: activeClassName,
      done: doneClassName
    } = appliedClassesRef.current[type];
    
    appliedClassesRef.current[type] = {};
    
    if (baseClassName) {
      removeClass(node, baseClassName);
    }
    
    if (activeClassName) {
      removeClass(node, activeClassName);
    }
    
    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  }, []);
  
  const onEnter = useCallback((maybeNode, maybeAppearing) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    
    removeClasses(node, 'exit');
    addClass(node, appearing ? 'appear' : 'enter', 'base');
    
    props.onEnter?.(maybeNode, maybeAppearing);
  }, [resolveArguments, removeClasses, addClass, props.onEnter]);
  
  const onEntering = useCallback((maybeNode, maybeAppearing) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    
    addClass(node, type, 'active');
    props.onEntering?.(maybeNode, maybeAppearing);
  }, [resolveArguments, addClass, props.onEntering]);
  
  const onEntered = useCallback((maybeNode, maybeAppearing) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    
    removeClasses(node, type);
    addClass(node, type, 'done');
    
    props.onEntered?.(maybeNode, maybeAppearing);
  }, [resolveArguments, removeClasses, addClass, props.onEntered]);
  
  const onExit = useCallback((maybeNode) => {
    const [node] = resolveArguments(maybeNode);
    
    removeClasses(node, 'appear');
    removeClasses(node, 'enter');
    addClass(node, 'exit', 'base');
    
    props.onExit?.(maybeNode);
  }, [resolveArguments, removeClasses, addClass, props.onExit]);
  
  const onExiting = useCallback((maybeNode) => {
    const [node] = resolveArguments(maybeNode);
    
    addClass(node, 'exit', 'active');
    props.onExiting?.(maybeNode);
  }, [resolveArguments, addClass, props.onExiting]);
  
  const onExited = useCallback((maybeNode) => {
    const [node] = resolveArguments(maybeNode);
    
    removeClasses(node, 'exit');
    addClass(node, 'exit', 'done');
    
    props.onExited?.(maybeNode);
  }, [resolveArguments, removeClasses, addClass, props.onExited]);
  
  const {
    classNames,
    ...otherProps
  } = props;
  
  return (
    <Transition
      {...otherProps}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    />
  );
}