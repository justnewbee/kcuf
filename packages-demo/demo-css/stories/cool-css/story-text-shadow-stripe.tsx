import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScStoryTextShadowStripe = styled.div`
  position: relative;
  margin: 30vmin auto;
  font-family: 'Times New Roman', serif;
  font-size: 30vmin;
  text-align: center;
  text-shadow: 4px 4px 1px hsl(0 0% 20%);
  line-height: 32vmin;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image: linear-gradient(-45deg, hsl(0 0% 100%) 0%, hsl(0 0% 100%) 25%, transparent 25%, transparent 50%, hsl(0 0% 100%) 50%, hsl(0 0% 100%) 75%, transparent 75%, transparent 100%);
    background-size: 6px 6px;
  }
  
  &::after {
    content: attr(data-name);
    position: absolute;
    inset: -4px 6px 6px -2px;
    z-index: 2;
    color: #333;
    text-shadow: 3px 3px hsl(0 0% 100%);
  }
`;

export default function StoryTextShadowStripe(): ReactElement {
  return <ScStoryTextShadowStripe data-name="Stripe Shadow">Stripe Shadow</ScStoryTextShadowStripe>;
}
