export type TUseRouteQueryResult<T extends object> = [Required<T>, (paramsUpdate: Partial<T>, pathname?: string) => void];
