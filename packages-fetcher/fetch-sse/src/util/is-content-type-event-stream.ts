export default function isContentTypeEventStream(contentType: string | null): boolean {
  return contentType ? /^text\/event-stream(;.*)?$/i.test(contentType) : false;
}
