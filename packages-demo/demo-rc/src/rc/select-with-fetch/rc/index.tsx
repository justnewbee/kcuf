import {
  ReactElement,
  useState,
  useEffect
} from 'react';

import {
  IDatasourceItem, TDatasourceValue
} from '../../../types';
import Select from '../../select';
import {
  ISelectWithFetchProps
} from '../types';

export default function SelectWithFetch<T extends TDatasourceValue = string>({
  fetchDatasource,
  onFetchSuccess,
  onFetchError,
  ...props
}: ISelectWithFetchProps<T>): ReactElement {
  const [stateDatasource, setStateDatasource] = useState<IDatasourceItem<T>[]>([]);
  
  useEffect(() => {
    fetchDatasource().then(datasource => {
      setStateDatasource(datasource);
      onFetchSuccess?.(datasource);
    }).catch(onFetchError);
  }, [fetchDatasource, onFetchSuccess, onFetchError, setStateDatasource]);
  
  return <Select {...props} datasource={stateDatasource} />;
}
