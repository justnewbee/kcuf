# @kcuf-ui/rc-transition

A ~~fork~~ rewritten of `https://www.npmjs.com/package/react-transition-group` using TS and hooks.

It's NOT designed to be a drop-in replacement of `react-transition-group`, however some APIs are learned from it.

## Why

1. `react-transition-group` has not been updated for over 2 years (version 4.4.5 till 2025/01/03)
2. `react-transition-group` is written in JS
3. `react-transition-group` depends on `prop-types` which TS react coders might hate
4. `react-transition-group` is in class component format
5. `react-transition-group` uses deprecated [findDOMNode](https://legacy.reactjs.org/docs/react-dom.html) which can only be used in class component
6. `react-transition-group` cannot start its own dev environment now, a bunch of errors

## How to Use

### Using Render Props

```tsx
import Transition from '@kcuf-ui/rc-transition';

const transitionStyles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
};

<Transition {...props}>
  {(status: 'entering' | 'entered' | 'exiting' | 'exited') => <Child style={transitionStyles[status]} />}
</Transition>
```

### Using `data-transition`

```tsx
import styled from 'styled-components';

import Transition from '@kcuf-ui/rc-transition';

const ScChild = styled.div`
  &[data-transition='entering'] {
    opacity: 1;
  }
  
  &[data-transition='entered'] {
    opacity: 1;
  }
  
  &[data-transition='exiting'] {
    opacity: 0;
    text-decoration: line-through;
  }
  
  &[data-transition='exited'] {
    opacity: 0;
  }
`;

<Transition {...props}>
  <ScChild />
</Transition>
```

### Using `useTransitionStatus` hook

```tsx
import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import Transition, {
  useTransitionStatus
} from '@kcuf-ui/rc-transition';

function Child(): ReactElement {
  const transitionStatus = useTransitionStatus(); // however you would like to use it
  
  return <div>...</div>;
}

<Transition {...props}>
  <Child />
</Transition>
```

## APIs

### Exports

* Removed
  + `CSSTransition` → `Transition` + `data-transition` is enough
* Renamed
  + `SwitchTransition` → `TransitionSwitch` TODO
  + `ReplaceTransition` → `TransitionReplace` TODO

### TransitionProps

| prop | Description |
| :---: | :---: |
| `nodeRef` | Needed when `mountOnEnter \|\| unmountOnExit` to force reflow. |
| `in` | Same as `react-transition-grpup`. |
| `durationEnter?: number` | Default 400ms |
| `durationExit?: number` | Default to `durationEnter` |
| `onEnter()` | No parameters. |
| `onEntered()` | No parameters. |
| `onExit()` | No parameters. |
| `onExited()` | No parameters. |

These props are removed:

* ~~`onEntering()`~~
* ~~`onExiting()`~~
* ~~`appear`~~ → There is no `appear` now, treated the same as `enter`.
* ~~`enter`~~ → `durationEnter: 0`
* ~~`exit`~~ → `durationExit: 0`
* ~~`timeout?: number \| { apear?: number; enter?: number; exit: number; }`~~ → `durationEnter?: number` + `durationExit?: number`
* ~~`addEventListener`~~