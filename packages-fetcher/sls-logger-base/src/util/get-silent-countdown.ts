const START = Date.now();

export default function getSilentCountdown(silentTime: number): number {
  return START + silentTime - Date.now();
}