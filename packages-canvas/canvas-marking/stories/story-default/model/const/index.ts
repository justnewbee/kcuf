export const IMAGE_URL_AERIAL = 'https://static.liangceai.net/demo/aerial-rooftop.jpeg';
export const IMAGE_URL_BAD = 'https://fuck-em-bad-image.com/no-such-image-at-all.jpg';

export const IMAGE_SVG_POINT: HTMLImageElement = (src => {
  const image = new Image();
  
  image.src = src;
  
  return image;
})('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xNzAuNSA5My41LTUuNiAxNy4zYTYuNSA2LjUgMCAwIDEtNS44IDQuMkg0NC40Yy0yLjUgMC01LjEtMi01LjgtNC4ybC01LTE1LjZhNTEuNiA1MS42IDAgMCAwIDY2LjMtMzEuNiA1MS40IDUxLjQgMCAwIDAgNzAuNiAyOS45WiIgZmlsbD0iI0I1RTNERiIvPjxwYXRoIGQ9Ik0xMDAgMzRBNTEuNSA1MS41IDAgMCAwIDAgNTAuMmE1MS41IDUxLjUgMCAwIDAgMTAwIDE2LjIgNTEuNSA1MS41IDAgMCAwIDEwMC0xNi4yQTUxLjUgNTEuNSAwIDAgMCAxMDAgMzRaIiBmaWxsPSIjRkRFNkMwIi8+PHBhdGggZD0iTTEzNi42IDQwLjdjLjgtNC41IDMuNi04LjMgNy42LTEwLjUgNC0yLjIgOC44LTIuNiAxMy0xYTEyMyAxMjMgMCAwIDEtMjAuNiAxMS41Wk00MS44IDI5LjJjMS44LS43IDMuNy0xIDUuNi0xIDcuNSAwIDEzLjcgNS4zIDE1LjEgMTIuNGExMjMgMTIzIDAgMCAxLTIwLjctMTEuNFoiIGZpbGw9IiNGRjdFN0UiLz48cGF0aCBkPSJNMTAwLjQgNTIuMWMtMzEuMy0yLjktNTkuMi0xNy43LTc5LTM5LjhBNDkuOCA0OS44IDAgMCAwIDQuNyA2OC4xYTUwLjkgNTAuOSAwIDAgMCA5NS40LjkgNTAuNyA1MC43IDAgMCAwIDk4LjItMTcuMmMwLTE2LTcuNS0zMC4yLTE5LjQtMzkuNWExMjEuMyAxMjEuMyAwIDAgMS03OC41IDM5LjhaIiBmaWxsPSIjQ0JGNEYwIi8+PC9nPjwvc3ZnPg==');

export * from './marking-config';

export { default as DEMO_MARKINGS_AERIAL } from './marking-items-aerial';
export { default as DEMO_MARKINGS_GIRL } from './marking-items-girl';
export { default as DEMO_MARKINGS_BAD_IMAGE } from './marking-items-bad-image';
export { default as DEMO_MARKINGS_NO_IMAGE } from './marking-items-no-image';
