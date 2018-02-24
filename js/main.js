const CANVAS_WIDTH = 640, CANVAS_HEIGHT = 640;

let canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext('2d');

function Bullet(bullet) {
    
    bullet.w = 10;
    bullet.h = 10;
    bullet.color = "white";
    bullet.yVelocity = -bullet.speed;
    bullet.active = true;
    
    bullet.draw = function() {
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.w / 2, 0, Math.PI * 2);
        ctx.fill();
    };
    
    bullet.inBounds = function() {
        return bullet.y >= 0;
    };

    bullet.update = function() {
        bullet.y += bullet.yVelocity;
        bullet.active = bullet.active && bullet.inBounds();              
    };

    return bullet;
}

var hero = {
    color: "red",
    w: 100,
    h: 100,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 110,
    speed: 10,
    bullets: [],
    shooting: false,
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    shoot: function() {
        if(this.shooting) return;
        this.shooting = setInterval(() => {
            this.bullets.push(new Bullet({
                speed: 5,
                x: this.x + this.w/2,
                y: this.y
            }));
        }, 700);
    },
    moveLeft: function() {
        if(this.x > 0) {
            this.x -= this.speed;
        }
    },
    moveRight: function() {
        if(this.x < CANVAS_WIDTH - this.w) {
            this.x += this.speed;
        }
    },
    inBounds: function() {
        return this.x > 0 && this.x < CANVAS_WIDTH - this.w;
    }
};

function Block(block = {}) {
    block.w = 100;
    block.h = 50;    
    block.points = Math.floor(Math.random() * 15000000) + 5000000;
    block.active = true;

    block.draw = function() {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.w, block.h);
        ctx.font = "20px Arial";
        let text = {
            value: `${+(block.points / 1000000).toFixed(1)}M`,
            color: "black",
            textMeasures: ctx.measureText(this.value),
            x: (block.x + block.w / 3),
            y: (block.y + block.h / 2)
        };            
        ctx.fillStyle = text.color;
        ctx.fillText(text.value, text.x, text.y);
    };

    block.alive = function() {
        return block.points > 1000000;
    };

    block.update = function() {        
        block.active = block.active && block.alive();
    }


    return block;
}

function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}

let blocks = [];

let n = 6;
let blockWidth = CANVAS_WIDTH / n;

for (let i = 0; i < n; i++) {
    blocks.push(new Block({
        color: `rgb(${rand(0,255)}, ${rand(0,255)}, ${rand(0,255)})`,
        w: blockWidth,
        x: blockWidth * i + 1,
        y: 50
    }));
}


var keydown = {
    left: false,
    right: false,
    space: false
}

var player = {
    score: 0
}

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "Arial 20px";
    ctx.fillText(`Score: ${+(player.score / 1000000).toFixed(1)}M`, 20, 50);
}

function collides(a, b) {
    return a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.h;
}

function handleCollisions() {
    hero.bullets.forEach( bullet => {
        blocks.forEach(block => {
            if(collides(bullet, block)) {
                bullet.active = false;
                block.points -= 10000;
                player.score += 10000;
            }
        });
    });
}


function update() {
    if(keydown.left) {
        hero.moveLeft();
    }

    if(keydown.right) {
        hero.moveRight();
    }

    if(keydown.space) {
        hero.shoot();
    }    
    
    hero.bullets.forEach(bullet => bullet.update());
    hero.bullets = hero.bullets.filter( bullet => bullet.active);
    blocks.forEach(block => block.update());
    blocks = blocks.filter(block => block.active);
    handleCollisions();
}

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground();
    drawScore();
    hero.draw();
    hero.bullets.forEach(bullet => bullet.draw());
    blocks.forEach(block => block.draw());
}

function handleControls(e) {
    if(e.keyCode === 37) keydown.left = e.type === "keydown" ? true : false;    
    if(e.keyCode === 39) keydown.right = e.type === "keydown" ? true : false;
    if(e.keyCode === 32) keydown.space = e.type === "keydown" ? true : false;
}

function addEventListeners() {
    window.addEventListener('keydown', handleControls);
    window.addEventListener('keyup', handleControls);
}


// game loop

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
addEventListeners();