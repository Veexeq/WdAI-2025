export class AudioController {

    constructor() {

        this.flapSound = new Audio('Sound_Effects/wing.wav');
        this.scoreSound = new Audio('Sound_Effects/point.wav');
        this.hitSound = new Audio('Sound_Effects/hit.wav');
        this.dieSound = new Audio('Sound_Effects/die.wav');

        this.flapSound.volume = 0.5;
        this.scoreSound.volume = 0.5;
        this.hitSound.volume = 0.5;
        this.dieSound.volume = 0.5;
    }

    playFlap() {
        this.flapSound.currentTime = 0;
        this.flapSound.play();
    }

    playScore() {
        this.scoreSound.currentTime = 0;
        this.scoreSound.play();
    }

    playHit() {
        if (this.hitSound.paused) {
            this.hitSound.play();
        }
    }

    playDie() {
        if (this.dieSound.paused) {
            this.dieSound.play();
        }
    }
}