export default function getPixelRatio(): number {
  const {
    devicePixelRatio
  } = window;
  
  return devicePixelRatio <= 1 ? 1 : Math.round(devicePixelRatio);
}
