// Take an existing segmented pathspec and round its corners.
// Used by `rounded` and `dots` styles.
export default function makePathSpecRound(oldPathSpec: string[]): string[] {
  const newPathSpec: string[] = [];
  let isInnerContour;
  
  for (let i = 0; i < oldPathSpec.length; i++) {
    if (oldPathSpec[i].startsWith('M')) {
      const coords = oldPathSpec[i].substring(1).split(' ').map(c => parseInt(c, 10));
      
      if (oldPathSpec[i + 1].startsWith('h')) {
        coords[0] += 0.5;
        isInnerContour = false;
      } else if (oldPathSpec[i + 1].startsWith('v')) {
        coords[1] += 0.5;
        isInnerContour = true;
      }
      
      newPathSpec.push(`M${coords[0]} ${coords[1]}`);
      i++; // Skip the first horizontal line segment
    }
    
    if (oldPathSpec[i] === 'z') {
      if (isInnerContour) {
        newPathSpec.push('a0.5 0.5 0 0 0 -0.5 0.5');
      } else {
        newPathSpec.push('a0.5 0.5 0 0 1 0.5 -0.5');
      }
      
      newPathSpec.push('z');
      
      // End this loop iteration here because (a) if this is the last path
      // segment, trying to access i+1 further down would cause errors,
      // and (b) because we might as well.
      continue;
    }
    
    if (oldPathSpec[i] === 'h1' && oldPathSpec[i + 1] === 'h1') {
      newPathSpec.push('h1');
    }
    
    if (oldPathSpec[i] === 'h-1' && oldPathSpec[i + 1] === 'h-1') {
      newPathSpec.push('h-1');
    }
    
    if (oldPathSpec[i] === 'v1' && oldPathSpec[i + 1] === 'v1') {
      newPathSpec.push('v1');
    }
    
    if (oldPathSpec[i] === 'v-1' && oldPathSpec[i + 1] === 'v-1') {
      newPathSpec.push('v-1');
    }
    
    if (oldPathSpec[i] === 'h1' && oldPathSpec[i + 1] === 'v1') {
      newPathSpec.push('a0.5 0.5 0 0 1 0.5 0.5');
    }
    
    if (oldPathSpec[i] === 'h1' && oldPathSpec[i + 1] === 'v-1') {
      newPathSpec.push('a0.5 0.5 0 0 0 0.5 -0.5');
    }
    
    if (oldPathSpec[i] === 'h-1' && oldPathSpec[i + 1] === 'v1') {
      newPathSpec.push('a0.5 0.5 0 0 0 -0.5 0.5');
    }
    
    if (oldPathSpec[i] === 'h-1' && oldPathSpec[i + 1] === 'v-1') {
      newPathSpec.push('a0.5 0.5 0 0 1 -0.5 -0.5');
    }
    
    if (oldPathSpec[i] === 'v1' && oldPathSpec[i + 1] === 'h1') {
      newPathSpec.push('a0.5 0.5 0 0 0 0.5 0.5');
    }
    
    if (oldPathSpec[i] === 'v1' && oldPathSpec[i + 1] === 'h-1') {
      newPathSpec.push('a0.5 0.5 0 0 1 -0.5 0.5');
    }
    
    if (oldPathSpec[i] === 'v-1' && oldPathSpec[i + 1] === 'h1') {
      newPathSpec.push('a0.5 0.5 0 0 1 0.5 -0.5');
    }
    
    if (oldPathSpec[i] === 'v-1' && oldPathSpec[i + 1] === 'h-1') {
      newPathSpec.push('a0.5 0.5 0 0 0 -0.5 -0.5');
    }
    
    const len = newPathSpec.length;
    
    if (len >= 2 && newPathSpec[len - 1][0] == newPathSpec[len - 2][0] && ['h', 'v'].includes(newPathSpec[len - 1][0])) {
      const command = newPathSpec[len - 1][0];
      const delta1 = parseInt(newPathSpec.pop().slice(1), 10);
      const delta2 = parseInt(newPathSpec.pop().slice(1), 10);
      
      newPathSpec.push(command + (delta1 + delta2));
    }
  }
  
  return newPathSpec;
}
