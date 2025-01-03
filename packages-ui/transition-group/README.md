# @kcuf-ui/transition-group

A fork of `https://www.npmjs.com/package/react-transition-group`.

## Why Fork

1. `react-transition-group` has not been updated for over 2 years (version 4.4.5 till 2025/01/03)
2. `react-transition-group` not written in TS
3. `react-transition-group` depends on `prop-types`
4. `react-transition-group` using a lot of class component
5. `react-transition-group` using deprecated [findDOMNode](https://legacy.reactjs.org/docs/react-dom.html) (because it uses class components)
6. `react-transition-group` cannot start its own dev environment now, a bunch of errors
