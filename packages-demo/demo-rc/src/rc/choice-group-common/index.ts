import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  IDataSourceItem
} from '../../types';

export interface IChoiceGroupBaseProps<T, V = T | T[]> {
  dataSource: IDataSourceItem<T>[];
  label?: string | ReactElement;
  value?: V;
  defaultValue?: V;
  onChange?(value: V): void;
}

export const ScChoiceGroup = styled.div`
  line-height: 2;
`;

export const ScChoiceGroupLabel = styled.label`
  display: inline-block;
  margin-right: 20px;
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
