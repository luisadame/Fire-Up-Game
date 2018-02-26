import {CANVAS_WIDTH, CANVAS_HEIGHT, ctx} from './Canvas';
import Bullet from './Bullet';
import Block from './Block';
import Blocks from './Blocks';
import Hero from './Hero';
import player from './Player';
import Draw from './Draw';
import keydown from './Keydown';
import {addEventListeners} from './Controls';
import Collisions from './Collisions';

function setup() {
    Blocks.init();
}

function update() {
    if(keydown.left) {
        Hero.moveLeft();
    }

    if(keydown.right) {
        Hero.moveRight();
    }

    if(keydown.space) {
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
    Hero.draw();
    Hero.bullets.forEach(bullet => bullet.draw());
    Blocks.draw();
}


// game loop
function loop() {
    // FIXME: the draw function it's called before the update. Use asynchronous methods.
    update();
    draw();
    requestAnimationFrame(loop);
}

setup();
addEventListeners();
requestAnimationFrame(loop);