import { Bird } from './Bird.js'
import { InputHandler } from './InputHandler.js';
import { Pipe } from './Pipe.js';
import { Background } from './Background.js'

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
        this.background = new Background(this);
        
        this.pipes = [];
        this.pipeTimer = 100;
        this.pipeInterval = 150;

        this.gameIsStarted = false;
        this.toStartImage = new Image();
        this.toStartImage.src = "UI/message.png";
        this.toStartImageOpacity = 1;

        this.gameScore = 0;
        this.scoreImages = [];
        this.scoreHeight = 36;
        this.scoreWidth = 24;

        for (let i = 0; i < 10; i++) {
            const img = new Image();
            img.src = `UI/Numbers/${i}.png`;
            this.scoreImages.push(img);
        }

        this.gameOver = false;
        this.gameOverImage = new Image();
        this.gameOverImage.src = "UI/gameover.png";
    }

    checkCollisions() {

        const bird = this.bird;

        // The collision "object" has 5px margins
        const hitX = bird.x + 5;
        const hitY = bird.y + 5;
        const hitH = bird.height - 10;
        const hitW = bird.width - 10;

        // Collision with the floor
        if (hitY + hitH >= this.background.baseYPos) {
            this.gameOver = true;
        }

        // Collision with pipes
        this.pipes.forEach((pipe) => {

            // Bird inside the pipe on x-axis
            if (hitX + hitW > pipe.x && hitX < pipe.x + pipe.width) {

                // Bird inside the pipe on y-axis (take into consideration
                // that pipe.x and pipe.y are the coordinates of the top right
                // corner of the gap)
                if (hitY < pipe.y || hitY + hitH > pipe.y + pipe.gap) {
                    this.gameOver = true;
                }
            }
        });
    }

    countPoints() {

        this.pipes.forEach((pipe) => {

            if (!pipe.markedForScoring && this.bird.x > pipe.x + pipe.width) {
                
                this.gameScore += 1;
                pipe.markedForScoring = true;
            }
        });
    }

    update() {
        if (this.gameOver) {
            
            return;
        };

        this.background.update();
        this.bird.update();

        if (this.gameIsStarted) {
            
            if (this.toStartImageOpacity > 0) {
                this.toStartImageOpacity -= 0.05;
            }

            this.pipeTimer += 1;
            if (this.pipeTimer > this.pipeInterval) {
                this.pipes.push(new Pipe(this));

                // Make distance between pipes irregular
                this.pipeTimer = Math.random() * 120;
            }

            this.pipes.forEach((pipe) => pipe.update());
            this.pipes = this.pipes.filter((pipe) => !pipe.markedForDeletion);
        
            this.countPoints();
            this.checkCollisions();
        }
    }

    drawScore() {
        const scoreString = this.gameScore.toString();

        const digitWidth = 24;
        const totalWidth = scoreString.length * digitWidth;

        let currX = this.width - digitWidth;
        const currY = 0;

        for (let i = scoreString.length - 1; i >= 0; i--) {
            const idx = parseInt(scoreString[i]);
            const img = this.scoreImages[idx];

            if (img && img.complete) {
                this.ctx.drawImage(img, currX, currY, 
                    this.scoreWidth, this.scoreHeight);
            }

            currX -= digitWidth;
        }
    }

    drawGameOver() {

        if (this.gameOverImage.complete) {
            
            this.ctx.drawImage(this.gameOverImage,
                (this.width - this.gameOverImage.width) / 2,
                (this.height - this.gameOverImage.height) / 2);
        }
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.background.drawBackground();

        this.pipes.forEach((pipe) => pipe.draw());

        this.drawScore();

        this.background.drawBase();

        this.bird.draw();

        if (this.toStartImageOpacity > 0 && this.toStartImage.complete) {
            this.ctx.save();
        
            this.ctx.globalAlpha = this.toStartImageOpacity;

            const msgX = (this.canvas.width - this.toStartImage.width) / 2;
            const msgY = (this.canvas.height - this.toStartImage.height) / 2; // Lub trochę wyżej

        this.ctx.drawImage(this.toStartImage, msgX, msgY);

        this.ctx.restore();
        }

        if (this.gameOver) {

            this.drawGameOver();
        }
    }
}