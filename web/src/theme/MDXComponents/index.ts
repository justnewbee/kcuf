// eslint-disable-next-line import/no-unresolved
import MDXComponents from '@theme-original/MDXComponents';

import ComponentBrief from '../../rc/component-brief';
import PkgBrief from '../../rc/pkg-brief';
import Colored from '../../rc/colored';
import Highlight from '../../rc/highlight';
import TagRequired from '../../rc/tag-required';
import TagReadonly from '../../rc/tag-readonly';
import TagTodo from '../../rc/tag-todo';
import TagOverride from '../../rc/tag-override';
import TagDefault from '../../rc/tag-default';
import TagDeprecated from '../../rc/tag-deprecated';

export default {
  ...MDXComponents,
  ComponentBrief,
  PkgBrief,
  C: Colored,
  Highlight,
  TagRequired,
  TagReadonly,
  TagTodo,
  TagOverride,
  TagDefault,
  TagDeprecated
};
