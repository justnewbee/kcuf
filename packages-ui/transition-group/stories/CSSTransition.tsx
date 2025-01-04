import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import ToggleFixture from './rc/toggle-fixture';
import Fade from './transitions/CSSFade';

storiesOf('TransitionCss', module)
  .add('Fade', () => (
    <ToggleFixture>
      <Fade>asaghasg asgasg</Fade>
    </ToggleFixture>
  ))
  .add('Fade with appear', () => (
    <ToggleFixture defaultIn>
      <Fade appear>asaghasg asgasg</Fade>
    </ToggleFixture>
  ))
  .add('Fade with mountOnEnter', () => {
    return (
      <ToggleFixture>
        <Fade mountOnEnter>Fade with mountOnEnter</Fade>
      </ToggleFixture>
    );
  })
  .add('Fade with unmountOnExit', () => {
    return (
      <ToggleFixture>
        <Fade unmountOnExit>Fade with unmountOnExit</Fade>
      </ToggleFixture>
    );
  });
