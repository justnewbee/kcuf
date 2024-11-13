export default function getLogOnceKey(topic: string, once?: true | string): string | undefined {
  if (!once) {
    return;
  }
  
  if (once === true) {
    return topic;
  }
  
  return `${topic}~${once}`;
}
