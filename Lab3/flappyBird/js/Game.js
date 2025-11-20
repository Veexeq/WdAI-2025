import { Bird } from './Bird.js'
import { InputHandler } from './InputHandler.js';
import { Pipe } from './Pipe.js';

export class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Game's dimensions are based on the size of
        // the background image's sprite
        this.height = this.canvas.height = 512;
        this.width = this.canvas.width = 288;

        // For sharp edges on pixels
        this.ctx.imageSmoothingEnabled = false;

        this.bird = new Bird(this);
        this.inputHandler = new InputHandler(this);
        
        this.pipes = [];
        this.pipeTimer = 100;
        this.pipeInterval = 150;
    }

    update() {
        this.bird.update();

        this.pipeTimer += 1;
        if (this.pipeTimer > this.pipeInterval) {
            this.pipes.push(new Pipe(this));
            this.pipeTimer = 0;
        }

        this.pipes.forEach((pipe) => pipe.update());
        this.pipes = this.pipes.filter((pipe) => !pipe.markedForDeletion);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.pipes.forEach((pipe) => pipe.draw());
        this.bird.draw();
    }
}