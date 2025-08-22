# @kcuf-ui/theme-toggle

> A fork and re-written (using styled-components) of the wonderful [@theme-toggles/react](https://www.npmjs.com/package/@theme-toggles/react).

## Why

1. Don't want to manually include external CSS
2. Don't want the `button` wrap and the `as` prop does NOT work as expected, which makes it impossible to put it under my styled `button` (yields `validateDOMNesting` warning)

In other words, I just want the SVG elements.
