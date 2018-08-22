import { ctx, CANVAS_HEIGHT } from './Canvas';

export default function Block(block = {}) {
    block.w = 100;
    block.h = 50;
    block.points = Math.floor(Math.random() * 50 + 5);
    block.active = true;

    block.draw = function () {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.w, block.h);
        ctx.font = "20px Arial";
        let text = {
            value: block.points,
            color: "black",
            height: 20,
            x: (block.x + block.w / 2),
            y: (block.y + (block.h + 10) / 2)
        };
        ctx.textAlign = "center";
        ctx.fillStyle = text.color;
        ctx.fillText(text.value, text.x, text.y);
    };

    block.alive = function () {
        return block.points > 0;
    };

    block.inBounds = function () {
        return block.y < CANVAS_HEIGHT;
    };

    block.update = function () {
        block.active = block.active && block.alive() && block.inBounds();
        block.y += 1;
    }

    return block;
}
