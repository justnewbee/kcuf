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
  text-shadow: 4px 4px 1px #333;
  line-height: 40vmin;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image: linear-gradient(-45deg, #fff 0%, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent 100%);
    background-size: 6px 6px;
  }
  
  &::after {
    content: attr(data-name);
    position: absolute;
    inset: -4px 6px 6px -2px;
    z-index: 2;
    color: #333;
    text-shadow: 3px 3px #fff;
  }
`;

export default function StoryTextShadowStripe(): ReactElement {
  return <ScStoryTextShadowStripe data-name="Stripe Shadow">Stripe Shadow</ScStoryTextShadowStripe>;
}
