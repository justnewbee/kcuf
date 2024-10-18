export default function mergeTypeSearchParams(searchParams1: URLSearchParams, searchParams2: URLSearchParams): URLSearchParams {
  searchParams2.forEach((v, k) => {
    searchParams1.append(k, v); // 不用 set
  });
  
  return searchParams1;
}