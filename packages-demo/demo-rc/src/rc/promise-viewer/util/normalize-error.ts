export default function normalizeError(error?: Error): Record<string, unknown> {
  if (!error) {
    return {};
  }
  
  const o: Record<string, unknown> = {
    name: error.name,
    message: error.message
  };
   
  for (const k in error) {
    o[k] = (error as never)[k];
  }
  
  if (error.stack) {
    o.stack = error.stack;
  }
  
  return o;
}
