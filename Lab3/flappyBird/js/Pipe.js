export class Pipe {

    constructor(game) {
        this.game = game;
        
        this.width = 52;
        this.height = 320;
        this.gap = 150;
        
        const minHeight = 100;
        const maxHeight = this.game.height - this.gap - minHeight; 

        // (x, y) is the top left corner of the gap
        this.x = this.game.width;
        this.y = minHeight + Math.random() * (maxHeight - minHeight);

        this.image = new Image();
        this.image.src = "Flappy_Bird/pipe-green.png";
        
        this.markedForDeletion = false;

        this.velocity = 2;
    }

    update() {
        this.x -= this.velocity;
        
        if (this.x < -this.width) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        const ctx = this.game.ctx;
        if (!this.image.complete) return;

        // Upper pipe
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, -1);
        ctx.drawImage(this.image, 0, 0, this.width, this.height);
        ctx.restore();

        // Lower pipe
        ctx.drawImage(this.image, this.x, this.y + this.gap, 
            this.width, this.height);
    }
}