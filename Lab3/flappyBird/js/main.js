import { Game } from './Game.js'; 

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

// Stabilizing the game's behaviour on monitors with 
// different refresh rate
let lastTime = 0;
const targetFPS = 60;
const interval = 1000 / targetFPS;

function gameLoop(timestamp) {

    const deltaTime = timestamp - lastTime;

    if (deltaTime >= interval) {
        
        // Prevent lagging: save inaccuracies in order to
        // paint another frame earlier (if necessary) 
        lastTime = timestamp - (deltaTime % interval);
        
        game.update();
        game.draw();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop(0);
