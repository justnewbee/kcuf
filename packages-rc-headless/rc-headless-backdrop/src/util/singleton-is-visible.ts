import singletonGetVisibleItem from './singleton-get-visible-item';

export default function singletonIsVisible(n: number): boolean {
  const visibleItem = singletonGetVisibleItem();
  
  return visibleItem?.n === n;
}
