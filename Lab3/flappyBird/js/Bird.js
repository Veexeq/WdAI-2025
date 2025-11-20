export class Bird {

    createSprites() {
        const imagePaths = [
            "Flappy_Bird/yellowbird-downflap.png",
            "Flappy_Bird/yellowbird-midflap.png",
            "Flappy_Bird/yellowbird-upflap.png",
        ];

        imagePaths.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.sprites.push(img);
        });
    }

    constructor(game) {
        this.game = game;

        // Size of the bird sprite
        this.width = 34;
        this.height = 24;

        this.gravity = 0.25;
        this.velocity = 0;
        this.jumpStrength = 4;

        const yStartOffset = 47;
        this.x = game.width / 3 - this.width / 2;
        this.y = game.height / 2 - this.height / 2 + yStartOffset;

        this.sprites = [];
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.flapSpeed = 5;

        this.createSprites();

        this.angle = 0;
        this.maxDownAngle = 90 * (Math.PI / 180);
    }

    update() {

        if (this.game.gameIsStarted) {

            // velocity > 0: bird falls down
            // velocity < 0: birds goes up 
            this.velocity += this.gravity;
            this.y += this.velocity;

            this.frameTimer += 1;

            if (this.frameTimer % this.flapSpeed === 0) {
                this.currentFrame += 1;
                this.currentFrame %= this.sprites.length;
            }

            // Handling the sprite's rotation
            if (this.velocity < 0) {
                // If bird's going up, set it's rotation to -25 deg
                this.angle = -25 * (Math.PI / 180);

            } else {
                this.angle += 0.1;

                if (this.angle > this.maxDownAngle) {
                    this.angle = this.maxDownAngle;
                }
            }
        } else {
            this.frameTimer++;
            if (this.frameTimer % this.flapSpeed === 0) {
                this.currentFrame++;
                this.currentFrame %= this.sprites.length;
            }
        }
        
    }

    // In case of image loading error, draw a yellow rectangle
    drawFallback() {
        this.game.ctx.fillStyle = "yellow";
        this.game.ctx.fillRect(this.x, this.y, 
            this.width, this.height);
    }

    draw() {

        const ctx = this.game.ctx;
        const currentImage = this.sprites[this.currentFrame];

        if (!currentImage || !currentImage.complete) {
            this.drawFallback();
            return;
        }

        // Handling the rotation of the canvas, hence the save
        // and restore (the whole canvas is being rotated)
        ctx.save();

        // Move canvas' center to bird's center
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    
        ctx.rotate(this.angle);

        ctx.drawImage(currentImage, -this.width / 2, -this.height / 2, 
            this.width, this.height);

        ctx.restore();
    }

    flap() {

        if (this.game.gameOver) {
            location.reload();
            return;
        };

        if (!this.game.gameIsStarted) {
            this.game.gameIsStarted = true;
        }

        this.velocity = -this.jumpStrength;
    
        this.game.audioController.playFlap();
    }
}