export default function getDefaultTarget(href: string): '_blank' | undefined {
  if (/^(?:https?:)?\/\//.test(href)) {
    return '_blank';
  }
}