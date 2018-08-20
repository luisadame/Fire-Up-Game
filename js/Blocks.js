import { CANVAS_WIDTH } from './Canvas';
import Block from './Block';
import { rand } from './utils';

let Blocks = {
    data: [],
    init: () => {
        let n = 6;
        let blockWidth = CANVAS_WIDTH / n;

        for (let i = 0; i < n; i++) {
            Blocks.data.push(new Block({
                color: `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`,
                w: blockWidth,
                x: blockWidth * i + 1,
                y: 50
            }));
        }
    },
    update: function () {
        this.draw();
        Blocks.data.forEach(block => block.update());
        Blocks.data = Blocks.data.filter(block => block.active);
    },
    draw: () => {
        Blocks.data.forEach(block => block.draw());
    }
}

export default Blocks;
