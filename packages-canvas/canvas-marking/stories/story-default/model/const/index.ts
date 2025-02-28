export const IMAGE_URL_AERIAL = 'https://static.liangceai.net/demo/aerial-rooftop.jpeg';
export const IMAGE_URL_BAD = 'https://fuck-em-bad-image.com/no-such-image-at-all.jpg';

export const IMAGE_SVG_POINT: HTMLImageElement = (src => {
  const image = new Image();
  
  image.src = src;
  
  return image;
})(`data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="970">
<path fill="#558D6C" d="m0 0 88.14 753.92L512 969.57V0z"/>
<path fill="#5AA579" d="M512 0v969.57l.43.43 424.04-215.74L1024 0z"/>
<path fill="#60BE86" d="m120.63 122.2 56.25 564.51L512 848.49V122.2z"/>
<path fill="#65D693" d="M512 122.2v726.29l.43.43 335.3-162.47 55.64-564.25z"/>
<path d="M873.55 406.19 591.21 272.12l-15.86-7.8-9.7 19.75L512 393.28v128.96l79.3-156.58 186.32 82.88-200.1 89.81-7.54 4.07v94.23l20.02-9.79 284.07-135.88a17.32 17.32 0 0 0 7.98-17.33V423.6a17.32 17.32 0 0 0-8.5-17.41" fill="#5AA579"/>
<path d="m442.67 531.68-188.84-83.14 201.93-89.81 15.25-6.07v-94.92l-29.47 12.47-294.04 135.9a19.57 19.57 0 0 0-11.1 17.31v49.97a19.23 19.23 0 0 0 10.75 17.33l289.8 134.41 17.33 7.8 10.49-19.58 47.23-91.1V393.27l-69.33 138.4Z" fill="#558D6C"/>
</svg>`)}`);

export * from './marking-config';

export { default as DEMO_MARKINGS_AERIAL } from './marking-items-aerial';
export { default as DEMO_MARKINGS_GIRL } from './marking-items-girl';
export { default as DEMO_MARKINGS_BAD_IMAGE } from './marking-items-bad-image';
export { default as DEMO_MARKINGS_NO_IMAGE } from './marking-items-no-image';
