import styled from 'styled-components';

import {
  IControllableValue,
  IDatasourceItem
} from '../../types';

export interface IChoiceGroupBaseProps<T, V extends T | T[] = T> extends IControllableValue<V> {
  datasource: IDatasourceItem<T>[];
}

export const ScChoiceGroup = styled.div`
  line-height: 2;
  
  form & {
    display: inline-block;
    vertical-align: middle;
  }
`;
