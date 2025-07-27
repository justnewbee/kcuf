import confetti from 'canvas-confetti';

const DURATION = 5 * 1000;

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function throwOne(particleCount: number, x: number): void {
  confetti({ // since particles fall down, start a bit higher than random
    particleCount,
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    origin: {
      x,
      y: Math.random() - 0.2
    }
  });
}

export default function throwConfetti(): void {
  const animationEnd = Date.now() + DURATION;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      clearInterval(interval);
      
      return;
    }
    
    const particleCount = 50 * (timeLeft / DURATION);
    
    // since particles fall down, start a bit higher than random
    throwOne(particleCount, randomInRange(0.1, 0.3));
    throwOne(particleCount, randomInRange(0.7, 0.9));
  }, 250);
}
