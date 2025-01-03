import {
  Component,
  cloneElement,
  Children
} from 'react';
import {
  findDOMNode
} from 'react-dom';

import {
  ITransitionReplaceProps
} from './types';
import TransitionGroup from './transition-group';

/**
 * The `<TransitionReplace>` component is a specialized `Transition` component
 * that animates between two children.
 *
 * ```tsx
 * <TransitionReplace in>
 *   <Fade><div>I appear first</div></Fade>
 *   <Fade><div>I replace the above</div></Fade>
 * </TransitionReplace>
 * ```
 */
export default class TransitionReplace extends Component<ITransitionReplaceProps> {
  handleEnter = (...args) => this.handleLifecycle('onEnter', 0, args);
  handleEntering = (...args) => this.handleLifecycle('onEntering', 0, args);
  handleEntered = (...args) => this.handleLifecycle('onEntered', 0, args);

  handleExit = (...args) => this.handleLifecycle('onExit', 1, args);
  handleExiting = (...args) => this.handleLifecycle('onExiting', 1, args);
  handleExited = (...args) => this.handleLifecycle('onExited', 1, args);

  handleLifecycle(handler, idx, originalArgs) {
    const { children } = this.props;
    const child = Children.toArray(children)[idx];

    if (child.props[handler]) {
      child.props[handler](...originalArgs);
    }
    
    if (this.props[handler]) {
      const maybeNode = child.props.nodeRef ? undefined : findDOMNode(this);

      this.props[handler](maybeNode);
    }
  }

  render() {
    const { children, in: inProp, ...props } = this.props;
    const [first, second] = Children.toArray(children);

    delete props.onEnter;
    delete props.onEntering;
    delete props.onEntered;
    delete props.onExit;
    delete props.onExiting;
    delete props.onExited;

    return <TransitionGroup {...props}>
      {inProp ? cloneElement(first, {
        key: 'first',
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onEntered: this.handleEntered,
      }) : cloneElement(second, {
        key: 'second',
        onEnter: this.handleExit,
        onEntering: this.handleExiting,
        onEntered: this.handleExited
      })}
    </TransitionGroup>;
  }
}
