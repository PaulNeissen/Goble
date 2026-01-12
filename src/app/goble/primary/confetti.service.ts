import confetti from 'canvas-confetti';

export class ConfettiService {
  
  /**
   * Lance une animation de confettis pour célébrer une victoire
   */
  static celebrate(): void {
    this.fireConfetti();
    setTimeout(() => this.fireConfetti(), 300);
    setTimeout(() => this.fireConfetti(), 600);
  }

  /**
   * Lance un tir de confettis avec différents paramètres pour créer un effet varié
   */
  private static fireConfetti(): void {
    const count = 300;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Mélange de confettis colorés
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}
