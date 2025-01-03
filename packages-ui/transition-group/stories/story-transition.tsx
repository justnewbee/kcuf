import {
  ReactElement
} from 'react';

import ToggleFixture from './rc/toggle-fixture';
import {
  Fade
} from './transitions/Bootstrap';

// storiesOf('Transition', module).add('Bootstrap Fade', () => <ToggleFixture>
//   <Fade>asaghasg asgasg</Fade>
// </ToggleFixture>).add('Bootstrap Collapse', () => <ToggleFixture>
//   <Collapse>
//     asaghasg asgasg
//     <div>foo</div>
//     <div>bar</div>
//   </Collapse>
// </ToggleFixture>).add('Fade using React.forwardRef', () => {
//   const nodeRef = createRef();
//
//   return <ToggleFixture>
//     <FadeForwardRef ref={nodeRef}>
//       Fade using React.forwardRef
//     </FadeForwardRef>
//   </ToggleFixture>;
// }).add('Fade using innerRef', () => {
//   const nodeRef = createRef();
//
//   return <ToggleFixture>
//     <FadeInnerRef innerRef={nodeRef}>Fade using innerRef</FadeInnerRef>
//   </ToggleFixture>;
// }).add('Fade with mountOnEnter', () => <ToggleFixture>
//   <Fade mountOnEnter>Fade with mountOnEnter</Fade>
// </ToggleFixture>).add('Fade with unmountOnExit', () => <ToggleFixture>
//   <Fade unmountOnExit>Fade with unmountOnExit</Fade>
// </ToggleFixture>);

export default function StoryTransition(): ReactElement {
  return <ToggleFixture>
    <Fade>asaghasg asgasg</Fade>
  </ToggleFixture>;
}
