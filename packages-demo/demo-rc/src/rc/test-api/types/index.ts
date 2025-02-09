import {
  FormItemProps
} from '../../form';

export interface ITestApiProps {
  title: string;
  name: string;
  type: string;
  formItems?: FormItemProps[];
  test(): Promise<unknown>;
}
