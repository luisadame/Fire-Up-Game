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
    Draw.level();
}

// game loop
function loop() {
    draw();
    update();
    if (player.lost) {
        cancelAnimationFrame(window.game);
        $restart.classList.remove('hidden');
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
    $btn.classList.add('hidden');
}

function restart() {
    Hero.reset();
    player.reset();
    $restart.classList.add('hidden');
    setup();
    loop();
}

const $btn = document.getElementById('start');
const $restart = document.querySelector('.restart');
const $restart__btn = $restart.querySelector('.restart__btn');
$btn.addEventListener('click', init);
$restart__btn.addEventListener('click', restart);
