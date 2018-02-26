import {CANVAS_WIDTH, CANVAS_HEIGHT, ctx} from './Canvas';
import Bullet from './Bullet';

let Hero = {
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
    update: function() {
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter( bullet => bullet.active);
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

export default Hero;