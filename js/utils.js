export function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}

export function collides(a, b) {
    return a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.h;
}
