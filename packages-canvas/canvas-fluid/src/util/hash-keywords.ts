export default function hashKeywords(keywords: string[]): number {
  let hash = 0;
  
  for (const keyword of keywords) {
    for (let i = 0; i < keyword.length; i++) {
      hash = (hash << 5) - hash + keyword.charCodeAt(i) | 0;
    }
  }
  
  return hash;
}
