import {
  FormItemProps
} from '../../form';

export interface ITestApiProps {
  title: string;
  name: string;
  type: string;
  formItems?: FormItemProps[];
  immediate?: boolean; // 进入后立即调用接口
  test(): Promise<unknown>;
}
