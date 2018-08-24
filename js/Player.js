let player = {
    score: 0,
    lost: false,
    name: '',
    reset: function () {
        this.score = 0;
        this.lost = false;
    }
}

export default player;
