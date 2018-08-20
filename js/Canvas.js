const CANVAS_WIDTH = 640, CANVAS_HEIGHT = 640;

let canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext('2d');

export {CANVAS_WIDTH, CANVAS_HEIGHT, ctx};