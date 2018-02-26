import {CANVAS_WIDTH, CANVAS_HEIGHT, ctx} from './Canvas';
import player from './Player';

export default class Draw {
    
    static background() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    static score() {
        ctx.fillStyle = "white";
        ctx.font = "Arial 20px";
        ctx.fillText(`Score: ${+(player.score / 1000000).toFixed(1)}M`, 20, 50);
    }

}