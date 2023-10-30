
interface Sound {
  play(): void; // play sound
  stop(): void; // stop sound
  repeat(count: number): void; // repeat sound `count` times or infinity
  setVolume(value: number): void; // set volume of sound
}

class Sound implements Sound {
  private audio: HTMLAudioElement;

  constructor(soundPath: string) {
    this.audio = new Audio(soundPath);
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  repeat(count: number) {
    if (count === Infinity) {
      this.audio.loop = true;
    } else if (count > 0) {
      this.audio.loop = false;
      this.audio.addEventListener('ended', () => {
        if (count > 1) {
          count--;
          this.audio.currentTime = 0;
          this.audio.play();
        }
      });
    }
  }

  setVolume(value: number) {
    this.audio.volume = value;
  }
}

// usage:
const tapBlockSound = new Sound('public/sound/tapBlock.wav');
const gameOverSound = new Sound('public/sound/gameOverSound.wav');

// To play the sounds:
tapBlockSound.play(); 
gameOverSound.play(); 


tapBlockSound.setVolume(0.5); 
gameOverSound.repeat(2); 
