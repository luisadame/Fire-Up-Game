import { resize, CANVAS_WIDTH, CANVAS_HEIGHT, ctx } from './Canvas';
import Blocks from './Blocks';
import Hero from './Hero';
import Draw from './Draw';
import keydown from './Keydown';
import Collisions from './Collisions';
import { addEventListeners } from './Controls';
import player from './Player';
import Vue from 'vue/dist/vue.esm';

let game = {
    message: "Welcome to Fire Up Game!",
    showingScores: false,
    player: player
};

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

function setRecord() {
    let saved;
    if (saved = localStorage.getItem(player.name)) {
        if (player.score > saved) {
            localStorage.setItem(player.name, player.score);
        }
    } else {
        localStorage.setItem(player.name, player.score);
    }
}

// game loop
function loop() {
    draw();
    update();
    if (player.lost) {
        cancelAnimationFrame(window.game);
        game.message = "You lost!";
        player.playing = false;
        player.lost = true;
        setRecord();
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
    player.playing = true;
}

function restart() {
    Hero.reset();
    player.reset();
    setup();
    loop();
}

new Vue({
    el: '#wall',
    data: game,
    methods: {
        validName: function () {
            return !!player.name;
        },
        init: init,
        restart: restart,
        getMaxScore: function () {
            return localStorage.getItem(this.player.name);
        },
        getAllScores: function () {
            let scores = [],
                names = Object.keys(localStorage);
            for (let name of names) {
                scores.push({
                    name: name,
                    score: localStorage.getItem(name)
                });
            }
            return scores;
        },
        showScores: function () {
            if (this.showingScores) {
                this.message = "Welcome to Fire Up Game!";
                this.showingScores = false;
            } else {
                this.message = "Global Scores";
                this.showingScores = true;
            }
        }
    }
})
