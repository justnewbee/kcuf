import {
  ReactElement
} from 'react';

import {
  Article
} from '../../src';

export default function StoryDefault(): ReactElement {
  return <Article>
    <h1>Article</h1>
    <p>
      Article styles its descendants, so <em>em</em>, <strong>strong</strong>, <code>code</code>, <kbd>⌘ + K</kbd> and <a href="#">links</a> keep their own look without extra components.
    </p>
    <blockquote>Blockquote</blockquote>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </Article>;
}
