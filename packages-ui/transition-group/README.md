# @kcuf-ui/transition-group

A fork of `https://www.npmjs.com/package/@kcuf-ui/transition-group`.

## Why Fork

1. `@kcuf-ui/transition-group` has not been updated for over 2 years (version 4.4.5 till 2025/01/03)
2. `@kcuf-ui/transition-group` not written in TS
3. `@kcuf-ui/transition-group` depends on `prop-types`
4. `@kcuf-ui/transition-group` using a lot of class component
5. `@kcuf-ui/transition-group` using deprecated [findDOMNode](https://legacy.reactjs.org/docs/react-dom.html) (because it uses class components)
6. `@kcuf-ui/transition-group` cannot start its own dev environment now, a bunch of errors

## Changes

This is designed to be almost drop-in replacement of `react-transition-group`, with some BREAKING changes.

### Naming Changes

* `CSSTransition` → `TransitionCss`
* `SwitchTransition` → `TransitionSwitch`
* `ReplaceTransition` → `TransitionReplace`

### API Changes

#### TransitionProps

**Removed**

* `appear`
* `enter` → `duration.enter = 0`
* `exit` → `duration.exit = 0`

**Renamed**

* `timeout` → `duration`
* `addEventListener` is removed (replaced with `onTransitionEnd`、`onTransitionCancel`)
* `ref` is a must now as `findDOMNode` is deprecated and cannot be used in functional components
* `onXx` callbacks do not give back `node` parameter now
