import createDiv from './create-div';

const CLASS = 'marking-stage';
const CSS = `position: relative;
width: 100%;
height: 100%;
background: hsl(0 0% 95%) 0 0/16px 16px url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"%3E%3Cpath d="M1 2V0h1v1H0v1z" fill-opacity=".05"/%3E%3C/svg%3E');
transition: all 300ms ease-in-out;`;

export default function createMarkingStage(): HTMLDivElement {
  const stage = createDiv(CLASS);
  
  stage.style.cssText = CSS;
  
  return stage;
}
