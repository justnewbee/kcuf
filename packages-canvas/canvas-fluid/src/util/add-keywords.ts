export default function addKeywords(source: string, keywords: string[] | null): string {
  if (!keywords) {
    return source;
  }
  
  let keywordsString = '';
  
  for (const keyword of keywords) {
    keywordsString += `#define ${keyword}\n`;
  }
  
  return keywordsString + source;
}
