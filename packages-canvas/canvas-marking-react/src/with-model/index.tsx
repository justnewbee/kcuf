import Model from '../model';
import Ui from '../ui';

export default function WithModel() {
  return <Model>
    <Ui />
  </Model>;
}
