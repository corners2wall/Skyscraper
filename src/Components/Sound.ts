
interface ISound {
  play(): void; 
  stop(): void; 
  repeat(count: number): void; 
  setVolume(value: number): void; 
}

export default class Sound implements ISound {
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
    if (count>0) {
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
