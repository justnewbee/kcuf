export default function compactPathSpec(oldPathSpec: string[]): string[] {
  const newPathSpec: string[] = [];
  
  if (!oldPathSpec.length) {
    return newPathSpec;
  }
  
  newPathSpec.push(oldPathSpec[0]);
  
  for (const step of oldPathSpec.slice(1)) {
    const prev = newPathSpec[newPathSpec.length - 1];
    
    if ((step[0] === 'h' || step[0] === 'v') && step[0] === prev[0]) {
      const distance = parseFloat(prev.substring(1)) + parseFloat(step.substring(1));
      
      newPathSpec[newPathSpec.length - 1] = step[0] + distance;
    } else if (step[0] === 'm' && (prev[0] === 'm' || prev[0] === 'M')) {
      const prevPos = prev.substring(1).split(' ').map(c => parseFloat(c));
      const newDelta = step.substring(1).split(' ').map(c => parseFloat(c));
      
      newPathSpec[newPathSpec.length - 1] = prev[0] + (prevPos[0] + newDelta[0]).toPrecision(3) + ' ' + (prevPos[1] + newDelta[1]).toPrecision(3);
    } else {
      newPathSpec.push(step);
    }
  }
  
  return newPathSpec;
}
