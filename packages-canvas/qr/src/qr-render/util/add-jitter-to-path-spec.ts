import PRNG from '../class/prng';

export default function addJitterToPathSpec(oldPathSpec: string[], jitterValue: number, prng: PRNG): string[] {
  const newPathSpec: string[] = [];
  let currentPos = [null, null];
  
  for (const step of oldPathSpec) {
    if (step.startsWith('M')) {
      currentPos = step.slice(1).split(' ').map(c => parseInt(c, 10));
      newPathSpec.push(step);
    } else if (step.startsWith('h') || step.startsWith('v')) {
      let posIndex = 0; // default: h
      
      if (step.startsWith('v')) {
        posIndex = 1;
      }
      
      const distance = parseInt(step.slice(1), 10);
      
      currentPos[posIndex] += distance;
      
      const jitteredPos = currentPos.map(c => c + (prng.next() * 2 - 1) * jitterValue);
      
      newPathSpec.push(`L${jitteredPos[0]} ${jitteredPos[1]}`);
    } else {
      newPathSpec.push(step);
    }
  }
  
  return newPathSpec;
}
