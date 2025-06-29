/**
 * Mini pseudo-random number generator. Used because rerendering
 * jittered bitmasks is easier when we can do it deterministically.
 */
export default class PRNG {
  // LCG using GCC's constants
  m = 0x80000000;
  a = 1103515245;
  c = 12345;
  state: number;
  
  constructor(seed: number) {
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }
  
  next() {
    this.state = (this.a * this.state + this.c) % this.m;
    
    return this.state / (this.m - 1);
  }
}
