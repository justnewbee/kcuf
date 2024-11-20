import styled from 'styled-components';

import {
  IDatasourceItem
} from '../../types';

export interface IChoiceGroupBaseProps<T, V extends T | T[] = T> {
  datasource: IDatasourceItem<T>[];
  value?: V;
  defaultValue?: V;
  onChange?(value: V): void;
}

export const ScChoiceGroup = styled.div`
  line-height: 2;
  
  form & {
    display: inline-block;
    vertical-align: middle;
  }
`;

export const ScChoiceGroupItem = styled.label`
  display: inline-block;
  margin-right: 1.2em;
  color: #777;
  transition: color 0.3s ease-in-out;
`;

export const ScChoiceGroupItemLabel = styled.span`
  margin-left: 8px;
`;
