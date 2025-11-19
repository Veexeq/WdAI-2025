export class Game {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Size of the background image
        this.canvas.height = 512;
        this.canvas.width = 288;

        // For sharp edges on pixels
        this.ctx.imageSmoothingEnabled = false;
    }

    update() {

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}