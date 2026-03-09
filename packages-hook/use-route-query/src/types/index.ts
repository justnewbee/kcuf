export type TUseRouteQueryResult<T extends object> = [
  Required<T>, // query
  (paramsUpdate: Partial<T>, pathname?: string) => void, // updateQuery
  () => void // resetQuery
];
