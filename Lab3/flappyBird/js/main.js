const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const bgImage = new Image();
bgImage.src = "Flappy_Bird/background-day.png";

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bgImage.complete) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
