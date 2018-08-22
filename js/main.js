import { resize, CANVAS_WIDTH, CANVAS_HEIGHT, ctx } from './Canvas';
import Blocks from './Blocks';
import Hero from './Hero';
import Draw from './Draw';
import keydown from './Keydown';
import Collisions from './Collisions';
import { addEventListeners } from './Controls';
import player from './Player';

function setup() {
    Blocks.init();
}

function update() {
    if (keydown.left) {
        Hero.moveLeft();
    }

    if (keydown.right) {
        Hero.moveRight();
    }

    if (keydown.space) {
        Hero.shoot();
    }

    Hero.update();
    Collisions.handle();
    Blocks.update();
}

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Draw.background();
    Draw.score();
}

// game loop
function loop() {
    draw();
    update();
    if (player.lost) {
        cancelAnimationFrame(window.game);
        alert('You\'ve lost!');
    } else {
        window.game = requestAnimationFrame(loop);
    }
}

setup();
function init(e) {
    console.log('Starting game!');
    addEventListeners();
    loop();
    window.addEventListener('resize', resize);
    e.target.style.display = "none";
}

const btn = document.getElementById('start');
btn.addEventListener('click', init);
