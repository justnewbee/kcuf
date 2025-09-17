import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  H1,
  H2,
  P,
  Button
} from '@kcuf/demo-rc';

import useFullscreen, {
  useFullscreenRef
} from '../src';

const ScImage = styled.img`
  width: 200px;
`;

function DocumentFullScreen(): ReactElement {
  const {
    fullscreen,
    toggle
  } = useFullscreen();
  
  return <Button onClick={toggle}>{fullscreen ? 'Exit Doc Fullscreen' : 'Enter Doc Fullscreen'}</Button>;
}

function ImageFullScreen(): ReactElement {
  const [ref, {
    fullscreen,
    toggle
  }] = useFullscreenRef();
  
  return <>
    <div>
      <ScImage src="https://img.alicdn.com/bao/uploaded/i2/2213122293174/O1CN017I6UV41ZJk9z7nVQF_!!4611686018427387318-0-item_pic.jpg" alt="" ref={ref} />
    </div>
    <Button onClick={toggle}>{fullscreen ? 'Exit Image Fullscreen' : 'Enter Image Fullscreen'}</Button>
  </>;
}

export default function StoryDefault(): ReactElement {
  const {
    fullscreen
  } = useFullscreen();
  
  return <>
    <H1>useFullscreen</H1>
    <P>Enter/exit fullscreen mode with given element or entire page</P>
    <H2>Document Fullscreen</H2>
    <P><code>useFullscreen</code> allows to enter/exit fullscreen for given element using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API" target="_blank" rel="noreferrer">Fullscreen API</a>.</P>
    <P>By default, if you do NOT provide ref, the hook will target <code>document.documentElement</code>:</P>
    <DocumentFullScreen />
    {fullscreen ? <DocumentFullScreen /> : null}
    <H2>Image Fullscreen</H2>
    <P>The hook returns an optional ref function that can be passed to an element to act as root:</P>
    <ImageFullScreen />
  </>;
}
