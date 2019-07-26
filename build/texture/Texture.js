var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TB = (function () {
    function TB() {
        this.perm = this.seed(255);
    }
    TB.prototype.vec = function (x, y, z, a) {
        return [x, y, z, a].filter(function (v) { return v; });
    };
    TB.prototype.normalize = function (a) {
        var l = this.length(a);
        l != 0 ? a = this.func(a, function (v, i) {
            return v / l;
        }) : a = a;
        return a;
    };
    TB.prototype.fract = function (v) {
        return v % 1;
    };
    TB.prototype.abs = function (a) {
        return a.map(function (v, i) { return Math.abs(v); });
    };
    TB.prototype.func = function (a, exp) {
        return a.map(function (v, i) { return exp(v, i); });
    };
    TB.prototype.toScale = function (v, w) {
        var a = 0, b = w, c = -1, d = 1.;
        return (v - a) / (b - a) * (d - c) + c;
    };
    ;
    TB.prototype.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    TB.prototype.length = function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    };
    TB.prototype.fade = function (t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };
    TB.prototype.lerp = function (t, a, b) { return a + t * (b - a); };
    TB.prototype.grad = function (hash, x, y, z) {
        var h = hash & 15;
        var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    };
    TB.prototype.scale = function (n) { return (1 + n) / 2; };
    TB.prototype.seed = function (n) {
        var p = [];
        for (var a = [], b = 0; n >= b; b++)
            a.push(b);
        for (b = 0; n >= b; b++) {
            var c = n * Math.random(), d = a[~~c];
            a.splice(c, 1, a[b]);
            a.splice(b, 1, d);
        }
        ;
        for (var i = 0; i < n; i++)
            p[n + i] = p[i] = a[i];
        return p;
    };
    TB.prototype.noise = function (x, y, z) {
        var t = this;
        var p = this.perm;
        var X = ~~(x) & 255, Y = ~~(y) & 255, Z = ~~(z) & 255;
        x -= ~~(x);
        y -= ~~(y);
        z -= ~~(z);
        var u = t.fade(x), v = t.fade(y), w = t.fade(z);
        var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
        return t.scale(t.lerp(w, t.lerp(v, t.lerp(u, t.grad(p[AA], x, y, z), t.grad(p[BA], x - 1, y, z)), t.lerp(u, t.grad(p[AB], x, y - 1, z), t.grad(p[BB], x - 1, y - 1, z))), t.lerp(v, t.lerp(u, t.grad(p[AA + 1], x, y, z - 1), t.grad(p[BA + 1], x - 1, y, z - 1)), t.lerp(u, t.grad(p[AB + 1], x, y - 1, z - 1), t.grad(p[BB + 1], x - 1, y - 1, z - 1)))));
    };
    return TB;
}());
var T = (function () {
    function T(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.coord = function (pixel, x, y, w, h, fn) {
            var r = pixel[0];
            var g = pixel[1];
            var b = pixel[2];
            var res = fn.apply(_this.helpers, [[r, b, g], x, y, w, h]);
            return res;
        };
        var c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        this.ctx = c.getContext("2d");
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);
        this.helpers = new TB();
    }
    T.createTexture = function (width, height, fn) {
        var instance = new T(width, height);
        instance.render(fn);
        return instance.toBase64();
    };
    T.prototype.render = function (fn) {
        var buffer = this.buffer;
        var w = this.width, h = this.height;
        for (var idx, x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                idx = (x + y * w) * 4;
                var r = buffer.data[idx + 0];
                var g = buffer.data[idx + 1];
                var b = buffer.data[idx + 2];
                var pixel = this.coord([r, g, b], x, y, w, h, fn);
                buffer.data[idx + 0] = pixel[0];
                buffer.data[idx + 1] = pixel[1];
                buffer.data[idx + 2] = pixel[2];
            }
        }
        this.ctx.putImageData(buffer, 0, 0);
    };
    T.prototype.toBase64 = function () {
        return this.ctx.canvas.toDataURL("image/png");
    };
    return T;
}());
var TC = (function (_super) {
    __extends(TC, _super);
    function TC(w, h) {
        return _super.call(this, w, h) || this;
    }
    TC.prototype.draw = function (fn) {
        var res = fn.apply(this.helpers, [this.ctx, this.width, this, this.height]);
        return res;
    };
    TC.createTexture = function (width, height, fn) {
        var instance = new TC(width, height);
        instance.draw(fn);
        return instance.toBase64();
    };
    return TC;
}(T));
