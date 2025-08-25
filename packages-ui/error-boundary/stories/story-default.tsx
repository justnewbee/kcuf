import {
  ReactElement
} from 'react';

import {
  H1
} from '@kcuf/demo-rc';

import ErrorBoundary from '../src';

import ErrorTrigger from './error-trigger';

export default function StoryDefault(): ReactElement {
  return <>
    <H1>ErrorBoundary #1</H1>
    <ErrorBoundary>
      <ErrorTrigger />
    </ErrorBoundary>
    <H1>ErrorBoundary #2</H1>
    <ErrorBoundary>
      <ErrorTrigger />
    </ErrorBoundary>
  </>;
}
