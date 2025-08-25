import {
  ReactElement
} from 'react';
import styled from 'styled-components';

// --m = font size multiplier
// --u = stripe unit
// --o = shadow offset
const ScStoryTextShadowStripe = styled.div`
  --m: 2;
  --u: calc(var(--m) * 1px * sqrt(2));
  --o: -0.05em;
  
  place-self: center;
  background: repeating-linear-gradient(45deg, hsl(0 0% 0%) 0 var(--u), hsl(0 0% 0% / 0%) 0 calc(2 * var(--u))) text;
  color: transparent;
  font-family: 'Times New Roman', serif;
  font-size: 20vmin;
  font-weight: 600;
  text-align: center;
  text-shadow: var(--o) var(--o) hsl(0 0% 20%);
  text-transform: uppercase;
  text-wrap: balance;
  letter-spacing: 0.1em;
`;

export default function StoryTextShadowStripe(): ReactElement {
  return <ScStoryTextShadowStripe>Stripe Shadow</ScStoryTextShadowStripe>;
}
