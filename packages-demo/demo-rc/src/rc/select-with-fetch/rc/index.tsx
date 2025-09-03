import {
  ReactElement,
  useState,
  useMemo,
  useEffect
} from 'react';

import {
  IDatasourceItem
} from '../../../types';
import Select from '../../select';
import {
  ISelectWithFetchProps
} from '../types';

export default function SelectWithFetch<T extends object>({
  fetchList,
  optionLabel,
  optionValue,
  onFetchSuccess,
  onFetchError,
  ...props
}: ISelectWithFetchProps<T>): ReactElement {
  const [stateList, setStateList] = useState<T[]>([]);
  const datasource = useMemo((): IDatasourceItem[] => stateList.map(v => ({
    label: typeof optionLabel === 'function' ? optionLabel(v) : v[optionLabel] as string,
    value: typeof optionValue === 'function' ? optionValue(v) : v[optionValue] as string
  })), [stateList, optionLabel, optionValue]);
  
  useEffect(() => {
    fetchList().then(list => {
      setStateList(list);
      onFetchSuccess?.(list);
    }).catch(onFetchError);
  }, [fetchList, onFetchSuccess, onFetchError]);
  
  return <Select {...props} datasource={datasource} />;
}
