import useImperative from '../hook/use-imperative';
import useEffects from '../hook/use-effects';

export default function Lifecycle(): null {
  useImperative();
  useEffects();
  
  return null;
}
