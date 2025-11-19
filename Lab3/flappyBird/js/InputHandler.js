export class InputHandler {

    constructor(game) {
        
        this.game = game;
        
        window.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "ArrowUp") {
                this.game.bird.flap();
            }
        });

        window.addEventListener("click", () => {
            this.game.bird.flap();
        });
    }
}