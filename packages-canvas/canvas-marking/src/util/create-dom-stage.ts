import createDomDiv from './create-dom-div';

const CLASS = 'marking-stage';
const CSS = `position: absolute;
inset: 0;
background: hsl(0 0% 95%) 0 0/16px 16px url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"%3E%3Cpath d="M1 2V0h1v1H0v1z" fill-opacity=".05"/%3E%3C/svg%3E');
transition: all 300ms ease-in-out;`;

export default function createDomStage(): HTMLDivElement {
  const stage = createDomDiv(CLASS);
  
  stage.style.cssText = CSS;
  
  return stage;
}