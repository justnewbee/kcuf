export type TFetcherHeadersFallback = Record<string, string | number | boolean>;

export type TFetcherHeadersFallbackNormalized = Record<string, string>;

export type TFetcherHeaders = Headers | TFetcherHeadersFallback;

export type TFetcherHeadersNormalized = Headers | TFetcherHeadersFallbackNormalized;
