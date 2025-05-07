import {
  FormItemProps
} from '../../form';

export interface ITestApiProps {
  title: string;
  name: string;
  type: string;
  formItems?: FormItemProps[];
  auto?: boolean; // test 方法变化时，自动调用
  test(): Promise<unknown>;
}
