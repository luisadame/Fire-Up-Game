import {ctx} from './Canvas';

export default function Block(block = {}) {
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