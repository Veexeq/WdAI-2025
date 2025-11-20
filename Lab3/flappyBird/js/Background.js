export class Background {

    constructor(game) {

        this.game = game;

        this.bgImage = new Image();
        this.bgImage.src = "Flappy_Bird/background-day.png";
        this.bgImageWidth = 288;
        this.bgImageHeight = 512;

        this.baseImage = new Image();
        this.baseImage.src = "Flappy_Bird/base.png";
        this.baseImageWidth = 336;
        this.baseImageHeight = 112;
        this.baseYPos = this.game.height - this.baseImageHeight;

        this.baseImageX = 0;
        this.speed = 2;
    }

    update() {

        this.baseImageX -= this.speed;
        if (this.baseImageX <= -this.baseImageWidth) {
            this.baseImageX = 0;
        }
    }

    drawBackground() {

        const ctx = this.game.ctx;

        if (this.bgImage && this.bgImage.complete) {
            ctx.drawImage(this.bgImage, 0, 0, 
                this.bgImageWidth, this.bgImageHeight);
        } else {
            ctx.fillStyle = "skyblue";
            ctx.fillRect(0, 0, this.bgImageWidth, 
                this.baseImageHeight);
        }
    }

    drawBase() {

        const ctx = this.game.ctx;

        if (this.baseImage && this.baseImage.complete) {

            // First image
            ctx.drawImage(this.baseImage, this.baseImageX, this.baseYPos, 
                this.baseImageWidth, this.baseImageHeight);

            ctx.drawImage(this.baseImage, this.baseImageX + this.baseImageWidth, 
                this.baseYPos, this.baseImageWidth, this.baseImageHeight);
        }
    }
}