export class Bird {

    constructor(game) {
        this.game = game;

        // Size of the bird sprite
        this.width = 34;
        this.height = 24;

        this.gravity = 0.25;
        this.velocity = 0;
        this.jumpStrength = 4;

        this.x = game.width / 2 - this.width / 2;
        this.y = game.height / 2 - this.height / 2;
    }

    update() {

        // velocity > 0: bird falls down
        // velocity < 0: birds goes up 
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw() {
        const ctx = this.game.ctx;
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap() {
        this.velocity = -this.jumpStrength;
    }
}