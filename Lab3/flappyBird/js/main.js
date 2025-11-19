import { Game } from './Game.js'; 

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

function gameLoop() {

    game.update();
    game.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
