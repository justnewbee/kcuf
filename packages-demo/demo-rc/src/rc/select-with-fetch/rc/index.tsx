import {
  ReactElement,
  forwardRef,
  useState,
  useEffect
} from 'react';

import {
  IDatasourceItem
} from '../../../types';
import Select from '../../select';
import {
  TSelectWithFetchRef,
  ISelectWithFetchProps
} from '../types';

function SelectWithFetch({
  fetchDatasource,
  onFetchSuccess,
  onFetchError,
  ...props
}: ISelectWithFetchProps, ref: TSelectWithFetchRef): ReactElement {
  const [stateDatasource, setStateDatasource] = useState<IDatasourceItem[]>([]);
  
  useEffect(() => {
    fetchDatasource().then(datasource => {
      setStateDatasource(datasource);
      onFetchSuccess?.(datasource);
    }).catch(onFetchError);
  }, [fetchDatasource, onFetchSuccess, onFetchError, setStateDatasource]);
  
  return <Select {...props} datasource={stateDatasource} ref={ref} />;
}

export default forwardRef(SelectWithFetch);
