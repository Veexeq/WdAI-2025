import { Bird } from './Bird.js'

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
    }

    update() {
        this.bird.update();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.bird.draw();
    }
}