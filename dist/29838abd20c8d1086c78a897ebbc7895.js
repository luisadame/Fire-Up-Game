// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CANVAS_WIDTH = 640,
    CANVAS_HEIGHT = 640;

var canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext('2d');

exports.CANVAS_WIDTH = CANVAS_WIDTH;
exports.CANVAS_HEIGHT = CANVAS_HEIGHT;
exports.ctx = ctx;
},{}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Bullet;

var _Canvas = require("./Canvas");

function Bullet(bullet) {

    bullet.w = 10;
    bullet.h = 10;
    bullet.color = "white";
    bullet.yVelocity = -bullet.speed;
    bullet.active = true;

    bullet.draw = function () {
        _Canvas.ctx.fillStyle = bullet.color;
        _Canvas.ctx.beginPath();
        _Canvas.ctx.arc(bullet.x, bullet.y, bullet.w / 2, 0, Math.PI * 2);
        _Canvas.ctx.fill();
    };

    bullet.inBounds = function () {
        return bullet.y >= 0;
    };

    bullet.update = function () {
        bullet.y += bullet.yVelocity;
        bullet.active = bullet.active && bullet.inBounds();
    };

    return bullet;
}
},{"./Canvas":6}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Block;

var _Canvas = require("./Canvas");

function Block() {
    var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    block.w = 100;
    block.h = 50;
    block.points = Math.floor(Math.random() * 15000000) + 5000000;
    block.active = true;

    block.draw = function () {
        _Canvas.ctx.fillStyle = block.color;
        _Canvas.ctx.fillRect(block.x, block.y, block.w, block.h);
        _Canvas.ctx.font = "20px Arial";
        var text = {
            value: +(block.points / 1000000).toFixed(1) + "M",
            color: "black",
            textMeasures: _Canvas.ctx.measureText(this.value),
            x: block.x + block.w / 3,
            y: block.y + block.h / 2
        };
        _Canvas.ctx.fillStyle = text.color;
        _Canvas.ctx.fillText(text.value, text.x, text.y);
    };

    block.alive = function () {
        return block.points > 1000000;
    };

    block.update = function () {
        block.active = block.active && block.alive();
    };

    return block;
}
},{"./Canvas":6}],24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rand = rand;
exports.collides = collides;
function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function collides(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.h;
}
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas = require('./Canvas');

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Blocks = {
    data: [],
    init: function init() {
        var n = 6;
        var blockWidth = _Canvas.CANVAS_WIDTH / n;

        for (var i = 0; i < n; i++) {
            Blocks.data.push(new _Block2.default({
                color: 'rgb(' + (0, _utils.rand)(0, 255) + ', ' + (0, _utils.rand)(0, 255) + ', ' + (0, _utils.rand)(0, 255) + ')',
                w: blockWidth,
                x: blockWidth * i + 1,
                y: 50
            }));
        }
    },
    update: function update() {
        Blocks.data.forEach(function (block) {
            return block.update();
        });
        Blocks.data = Blocks.data.filter(function (block) {
            return block.active;
        });
    },
    draw: function draw() {
        Blocks.data.forEach(function (block) {
            return block.draw();
        });
    }
};

exports.default = Blocks;
},{"./Canvas":6,"./Block":5,"./utils":24}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas = require('./Canvas');

var _Bullet = require('./Bullet');

var _Bullet2 = _interopRequireDefault(_Bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hero = {
    color: "red",
    w: 100,
    h: 100,
    x: _Canvas.CANVAS_WIDTH / 2,
    y: _Canvas.CANVAS_HEIGHT - 110,
    speed: 10,
    bullets: [],
    shooting: false,
    draw: function draw() {
        _Canvas.ctx.fillStyle = this.color;
        _Canvas.ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    update: function update() {
        this.bullets.forEach(function (bullet) {
            return bullet.update();
        });
        this.bullets = this.bullets.filter(function (bullet) {
            return bullet.active;
        });
    },
    shoot: function shoot() {
        var _this = this;

        if (this.shooting) return;
        this.shooting = setInterval(function () {
            _this.bullets.push(new _Bullet2.default({
                speed: 5,
                x: _this.x + _this.w / 2,
                y: _this.y
            }));
        }, 700);
    },
    moveLeft: function moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    },
    moveRight: function moveRight() {
        if (this.x < _Canvas.CANVAS_WIDTH - this.w) {
            this.x += this.speed;
        }
    },
    inBounds: function inBounds() {
        return this.x > 0 && this.x < _Canvas.CANVAS_WIDTH - this.w;
    }
};

exports.default = Hero;
},{"./Canvas":6,"./Bullet":4}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var player = {
    score: 0
};

exports.default = player;
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas');

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Draw = function () {
    function Draw() {
        _classCallCheck(this, Draw);
    }

    _createClass(Draw, null, [{
        key: 'background',
        value: function background() {
            _Canvas.ctx.fillStyle = "black";
            _Canvas.ctx.fillRect(0, 0, _Canvas.CANVAS_WIDTH, _Canvas.CANVAS_HEIGHT);
        }
    }, {
        key: 'score',
        value: function score() {
            _Canvas.ctx.fillStyle = "white";
            _Canvas.ctx.font = "Arial 20px";
            _Canvas.ctx.fillText('Score: ' + +(_Player2.default.score / 1000000).toFixed(1) + 'M', 20, 50);
        }
    }]);

    return Draw;
}();

exports.default = Draw;
},{"./Canvas":6,"./Player":7}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var keydown = {
    left: false,
    right: false,
    space: false
};

exports.default = keydown;
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addEventListeners = addEventListeners;

var _Keydown = require("./Keydown");

var _Keydown2 = _interopRequireDefault(_Keydown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleControls(e) {
    if (e.keyCode === 37) _Keydown2.default.left = e.type === "keydown" ? true : false;
    if (e.keyCode === 39) _Keydown2.default.right = e.type === "keydown" ? true : false;
    if (e.keyCode === 32) _Keydown2.default.space = e.type === "keydown" ? true : false;
}

function addEventListeners() {
    window.addEventListener('keydown', handleControls);
    window.addEventListener('keyup', handleControls);
}
},{"./Keydown":11}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hero = require('./Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Blocks = require('./Blocks');

var _Blocks2 = _interopRequireDefault(_Blocks);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collisions = function () {
    function Collisions() {
        _classCallCheck(this, Collisions);
    }

    _createClass(Collisions, null, [{
        key: 'handle',
        value: function handle() {
            _Hero2.default.bullets.forEach(function (bullet) {
                _Blocks2.default.data.forEach(function (block) {
                    if ((0, _utils.collides)(bullet, block)) {
                        bullet.active = false;
                        block.points -= 10000;
                        _Player2.default.score += 10000;
                    }
                });
            });
        }
    }]);

    return Collisions;
}();

exports.default = Collisions;
},{"./Hero":8,"./Blocks":10,"./Player":7,"./utils":24}],2:[function(require,module,exports) {
'use strict';

var _Canvas = require('./Canvas');

var _Bullet = require('./Bullet');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _Blocks = require('./Blocks');

var _Blocks2 = _interopRequireDefault(_Blocks);

var _Hero = require('./Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Draw = require('./Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _Keydown = require('./Keydown');

var _Keydown2 = _interopRequireDefault(_Keydown);

var _Controls = require('./Controls');

var _Collisions = require('./Collisions');

var _Collisions2 = _interopRequireDefault(_Collisions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
    _Blocks2.default.init();
}

function update() {
    if (_Keydown2.default.left) {
        _Hero2.default.moveLeft();
    }

    if (_Keydown2.default.right) {
        _Hero2.default.moveRight();
    }

    if (_Keydown2.default.space) {
        _Hero2.default.shoot();
    }

    _Hero2.default.update();
    _Collisions2.default.handle();
    _Blocks2.default.update();
}

function draw() {
    _Canvas.ctx.clearRect(0, 0, _Canvas.CANVAS_WIDTH, _Canvas.CANVAS_HEIGHT);
    _Draw2.default.background();
    _Draw2.default.score();
    _Hero2.default.draw();
    _Hero2.default.bullets.forEach(function (bullet) {
        return bullet.draw();
    });
    _Blocks2.default.draw();
}

// game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

setup();
(0, _Controls.addEventListeners)();
requestAnimationFrame(loop);
},{"./Canvas":6,"./Bullet":4,"./Block":5,"./Blocks":10,"./Hero":8,"./Player":7,"./Draw":9,"./Keydown":11,"./Controls":12,"./Collisions":13}],26:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '34737' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[26,2])
//# sourceMappingURL=/dist/29838abd20c8d1086c78a897ebbc7895.map