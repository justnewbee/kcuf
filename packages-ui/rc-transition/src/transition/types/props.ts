import {
  MutableRefObject
} from 'react';

export interface IModelProps {
  /**
   * A React reference to the DOM element that needs to transition.
   */
  nodeRef: MutableRefObject<HTMLElement | null>;
  
  /**
   * Show or hide the children, triggers status change.
   *
   * in: false → true, do transition-in
   *
   * 1. `durationIn` > 0
   *   1.1 If the children is not mounted, mount it
   *   1.2 Render children with status `exited`
   *   1.3 Render children with status `entering`, soon after step 2, fires `onEnter`
   *   1.4 Render children with status `entered`, after waiting for `durationIn`ms, fires `onEntered`
   * 2. `durationIn` <= 0
   *   2.1 If the children is not mounted, mount it
   *   2.2 Render children with status `entered`, fires `onEntered`
   *
   * in: true → false, do transition-out
   *
   * 1. `durationIn` > 0
   *   1.1 Render children with status `exiting`, fires `onExit`
   *   1.2 Render children with status `exited`, after waiting for `durationOut`ms, fires `onExited`
   *   1.3 Unmount children if `props.unmountOnExit`
   * 2. `durationIn` <= 0
   *   2.1 Render children with status `exited`, fires `onExited`
   *   2.2 Unmount children if `props.unmountOnExit`
   *
   * If the transition is not yet complete, and the `in` props changed, it will be able to cancel the timed update.
   */
  in?: boolean;
  
  /**
   * How long will status `entering` retain before `entered`, default 400ms.
   */
  durationIn?: number;
  
  /**
   * How long will status `exiting` retain before `exited`, default 400ms.
   */
  durationOut?: number;
  
  /**
   * By default, the child component is mounted immediately along with the parent `Transition` component.
   * If you want to 'lazy mount' the component on the first `in={true}` you can set `mountOnEnter`.
   * After the first enter transition the component will stay mounted, even on 'exited', unless you also specify `unmountOnExit`.
   */
  mountOnEnter?: boolean;
  
  /**
   * By default, the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
  
  /**
   * Fired when status changed to `entering`.
   */
  onEnter?(): void;
  
  /**
   * Fired when status changed to `entered`.
   */
  onEntered?(): void;
  
  /**
   * Fired when status changed to `exiting`.
   */
  onExit?(): void;
  
  /**
   * Fired when status changed to `exited`.
   */
  onExited?(): void;
}
