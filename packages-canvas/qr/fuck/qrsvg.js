window.qrsvg = {};

(function(qrsvg) {
  function G(a) {
    let k, n = [];
    for (let q = 0; q < a.length; q++) {
      if (a[q].startsWith('M')) {
        var h = a[q].substring(1).split(' ').map(y => parseInt(y, 10));
        a[q + 1].startsWith('h') ? (h[0] += .5, k = !1) : a[q + 1].startsWith('v') && (h[1] += .5, k = !0);
        n.push('M' + h[0] + ' ' + h[1]);
        q++;
      }
      if ('z' == a[q]) k ? n.push('a0.5 0.5 0 0 0 -0.5 0.5') : n.push('a0.5 0.5 0 0 1 0.5 -0.5'), n.push('z'); else if ('h1' == a[q] && 'h1' == a[q + 1] && n.push('h1'), 'h-1' == a[q] && 'h-1' == a[q + 1] && n.push('h-1'), 'v1' == a[q] && 'v1' == a[q + 1] && n.push('v1'), 'v-1' == a[q] && 'v-1' ==
      a[q + 1] && n.push('v-1'), 'h1' == a[q] && 'v1' == a[q + 1] && n.push('a0.5 0.5 0 0 1 0.5 0.5'), 'h1' == a[q] && 'v-1' == a[q + 1] && n.push('a0.5 0.5 0 0 0 0.5 -0.5'), 'h-1' == a[q] && 'v1' == a[q + 1] && n.push('a0.5 0.5 0 0 0 -0.5 0.5'), 'h-1' == a[q] && 'v-1' == a[q + 1] && n.push('a0.5 0.5 0 0 1 -0.5 -0.5'), 'v1' == a[q] && 'h1' == a[q + 1] && n.push('a0.5 0.5 0 0 0 0.5 0.5'), 'v1' == a[q] && 'h-1' == a[q + 1] && n.push('a0.5 0.5 0 0 1 -0.5 0.5'), 'v-1' == a[q] && 'h1' == a[q + 1] && n.push('a0.5 0.5 0 0 1 0.5 -0.5'), 'v-1' == a[q] && 'h-1' == a[q + 1] && n.push('a0.5 0.5 0 0 0 -0.5 -0.5'),
        h = n.length, 2 <= h && n[h - 1][0] == n[h - 2][0] && ['h', 'v'].includes(n[h - 1][0])) {
        h = n[h - 1][0];
        let y = parseInt(n.pop().slice(1), 10), p = parseInt(n.pop().slice(1), 10);
        n.push(h + (y + p));
      }
    }
    return n;
  }
  
  function v(a, k, n) {
    let h = [], q = [null, null];
    for (let y of a) y.startsWith('M') ? (q = y.slice(1).split(' ').map(p => parseInt(p, 10)), h.push(y)) : y.startsWith('h') || y.startsWith('v') ? (a = 0, y.startsWith('v') && (a = 1), q[a] += parseInt(y.slice(1), 10), a = q.map(p => p + (2 * n.next() - 1) * k), h.push('L' + a[0] + ' ' + a[1])) : h.push(y);
    return h;
  }
  
  function w(a) {
    let k =
      [];
    if (0 == a.length) return k;
    k.push(a[0]);
    for (let n of a.slice(1)) if (a = k[k.length - 1], 'h' != n[0] && 'v' != n[0] || n[0] != a[0]) if ('m' != n[0] || 'm' != a[0] && 'M' != a[0]) k.push(n); else {
      let h = a.substring(1).split(' ').map(y => parseFloat(y)), q = n.substring(1).split(' ').map(y => parseFloat(y));
      k[k.length - 1] = a[0] + (h[0] + q[0]).toPrecision(3) + ' ' + (h[1] + q[1]).toPrecision(3);
    } else k[k.length - 1] = n[0] + (parseFloat(a.substring(1)) + parseFloat(n.substring(1)));
    return k;
  }
  
  function A(a, k, n) {
    if (!['dots', 'mosaic', 'confetti'].includes(n)) throw Error('Unsupported tiled render style: ' +
      n);
    let h = [['M 0.5 0.1', 'A 0.4 0.4 0 0 1 0.5 0.9', 'A 0.4 0.4 0 0 1 0.5 0.1'], ['M 0.1 0.15', 'L 0.9 0.15', 'L 0.9 0.85', 'L 0.1 0.85', 'L 0.1 0.15'], 'M 0.68 0.254;Q 1.21 0.284 0.786 0.58;Q 0.9275 1.0925 0.498 0.801;Q 0.0545 1.1 0.212 0.606;Q -0.208 0.269 0.312 0.259;Q 0.5 -0.25 0.68 0.254'.split(';'), ['M 0.5 0.3', 'C 1.2 -0.1 1 0.7 0.5 1', 'C 0 0.7 -0.2 -0.1 0.5 0.3'], ['M 0.5 0', 'Q 0.65 0.35 1 0.5', 'Q 0.65 0.65 0.5 1', 'Q 0.35 0.65 0 0.5', 'Q 0.35 0.35 0.5 0'], 'M 0.45 0.45;A 0.23 0.23 0 1 1 0.55 0.45;A 0.23 0.23 0 1 1 0.54 0.48;L 0.7 0.95;L 0.3 0.95;L 0.46 0.48;A 0.23 0.23 0 1 1 0.45 0.45'.split(';'),
        ['M 0.5 0', 'Q 1.5 0.5 0.5 1', 'Q -0.5 0.5 0.5 0']], q = new b, y = new m(1),
      p = (l, u, z) => [.5 + (l - .5) * Math.cos(z) - (u - .5) * Math.sin(z), .5 + (l - .5) * Math.sin(z) + (u - .5) * Math.cos(z)];
    for (let l = 0; l < a.height; l++) for (let u = 0; u < a.width; u++) if (!(16 < a.width && 16 < a.height && (8 > u && 8 > l || 8 > u && l > a.height - 8 || u > a.width - 8 && 8 > l)) && a.get(u, l)) {
      let z = [];
      if ('dots' == n) z.push('M' + (u + k + .5) + ' ' + (l + k)), z.push('a0.5 0.5 0 0 1 0.5 0.5'), z.push('a0.5 0.5 0 0 1 -0.5 0.5'), z.push('a0.5 0.5 0 0 1 -0.5 -0.5'), z.push('a0.5 0.5 0 0 1 0.5 -0.5'), z.push('z');
      else if ('mosaic' == n) {
        var r = .03 * Math.PI;
        r *= 2 * y.next() - 1;
        z.push('M' + (u + k) + ' ' + (l + k));
        r = [p(.5 - .45, .5 - .45, r), p(.95, .5 - .45, r), p(.95, .95, r), p(.5 - .45, .95, r)];
        z.push('m' + r[0][0].toPrecision(3) + ' ' + r[0][1].toPrecision(3));
        z.push('l' + (r[1][0] - r[0][0]).toPrecision(3) + ' ' + (r[1][1] - r[0][1]).toPrecision(3));
        z.push('l' + (r[2][0] - r[1][0]).toPrecision(3) + ' ' + (r[2][1] - r[1][1]).toPrecision(3));
        z.push('l' + (r[3][0] - r[2][0]).toPrecision(3) + ' ' + (r[3][1] - r[2][1]).toPrecision(3));
        z.push('z');
      } else if ('confetti' == n) {
        z.push('M' +
          (u + k) + ' ' + (l + k));
        r = h[Math.floor(y.next() * h.length)];
        let L = [0, 0], E = y.next() * Math.PI * 2;
        for (let F of r) if (F = F.split(' '), r = (S, W) => {
          S = p(F[S], F[W], E);
          return (S[0] - L[0]).toPrecision(3) + ' ' + (S[1] - L[1]).toPrecision(3);
        }, 'M' == F[0]) {
          var t = p(F[1], F[2], E);
          z.push('m' + r(1, 2));
          L = t;
        } else 'L' == F[0] ? (t = p(F[1], F[2], E), z.push('l' + r(1, 2)), L = t) : 'Q' == F[0] ? (z.push('q' + r(1, 2) + ' ' + r(3, 4)), L = p(F[3], F[4], E)) : 'C' == F[0] ? (z.push('c' + r(1, 2) + ' ' + r(3, 4) + ' ' + r(5, 6)), L = p(F[5], F[6], E)) : 'A' == F[0] && (z.push('a' + F.slice(1, 6).join(' ') + ' ' + r(6,
          7)), L = p(F[6], F[7], E));
        z.push('z');
      }
      a.get(u - 1, l) || a.get(u + 1, l) || a.get(u, l - 1) || a.get(u, l + 1) ? q.j = q.j.concat(z) : q.i = q.i.concat(z);
    }
    return q;
  }
  
  function c(a, k) {
    let n = new b, h = [], q = a.width + 1, y = a.height + 1;
    for (var p = 0; p < y; p++) for (var r = 0; r < q; r++) h.push({});
    for (p = 0; p < y; p++) for (r = 0; r < q; r++) if (!(Object.keys(h[p * q + r]).includes('e') || a.get(r, p) == a.get(r - 1, p) && a.get(r, p) == a.get(r, p - 1) && a.get(r, p) == a.get(r - 1, p - 1) || a.get(r, p - 1)) && a.get(r, p)) for (var t = r, l = p, u = 'e'; !h[l * q + t][u];) {
      var z = u;
      'n' == u ? a.get(t, l - 1) && !a.get(t - 1, l -
        1) ? h[l * q + t][u] = [t, l - 1] : a.get(t, l - 1) ? a.get(t - 1, l - 1) && a.get(t, l - 1) && (h[l * q + t][u] = [t - 1, l], u = 'w') : (h[l * q + t][u] = [t + 1, l], u = 'e') : 'e' == u ? a.get(t, l) && !a.get(t, l - 1) ? h[l * q + t][u] = [t + 1, l] : a.get(t, l) ? a.get(t, l) && a.get(t, l - 1) && (h[l * q + t][u] = [t, l - 1], u = 'n') : (h[l * q + t][u] = [t, l + 1], u = 's') : 's' == u ? a.get(t - 1, l) && !a.get(t, l) ? h[l * q + t][u] = [t, l + 1] : a.get(t - 1, l) ? a.get(t, l) && a.get(t - 1, l) && (h[l * q + t][u] = [t + 1, l], u = 'e') : (h[l * q + t][u] = [t - 1, l], u = 'w') : 'w' == u && (a.get(t - 1, l - 1) && !a.get(t - 1, l) ? h[l * q + t][u] = [t - 1, l] : a.get(t - 1, l - 1) ? a.get(t - 1, l) &&
        a.get(t - 1, l - 1) && (h[l * q + t][u] = [t, l + 1], u = 's') : (h[l * q + t][u] = [t, l - 1], u = 'n'));
      l = h[l * q + t][z];
      if (!l) break;
      t = l[0];
      l = l[1];
    }
    for (p = 0; p < y; p++) for (r = 0; r < q; r++) if (!(16 < a.width && 16 < a.height && (8 > r && 8 > p || 8 > r && p > a.height - 8 || r > a.width - 8 && 8 > p)) && 0 != Object.keys(h[p * q + r]).length) {
      t = Object.keys(h[p * q + r])[0];
      u = [];
      u.push('M' + (r + k) + ' ' + (p + k));
      l = r;
      for (z = p; h[z * q + l][t];) {
        let L = h[z * q + l][t];
        delete h[z * q + l][t];
        let E, F;
        L[0] > l ? (t = 'e', E = 'h', F = 1) : L[0] < l ? (t = 'w', E = 'h', F = -1) : L[1] > z ? (t = 's', E = 'v', F = 1) : L[1] < z && (t = 'n', E = 'v', F = -1);
        u.push(E +
          F);
        l = L[0];
        z = L[1];
      }
      2 >= u.length || (0 == u.length % 2 && u.pop(), u.push('z'), 6 != u.length || u[1].startsWith('v') ? n.j = n.j.concat(u) : n.i = n.i.concat(u));
    }
    return n;
  }
  
  class b {
    constructor() {
      this.g = [];
      this.h = [];
      this.i = [];
      this.j = [];
    }
  }
  
  class d {
    constructor(a, k) {
      if (!Number.isInteger(a) || !Number.isInteger(k)) throw Error('Bitmask: width and height must be integers: ' + a + ', ' + k);
      this.width = a;
      this.height = k;
      this.g = Array(a * k);
      this.P(!1);
    }
    
    get(a, k) {
      if (!Number.isInteger(a) || !Number.isInteger(k)) throw Error('Bitmask: x and y must be integers: ' +
        a + ', ' + k);
      return 0 > a || a >= this.width || 0 > k || k >= this.height ? !1 : this.g[k * this.width + a];
    }
    
    set(a, k, n) {
      if (!Number.isInteger(a) || !Number.isInteger(k)) throw Error('Bitmask: x and y must be integers: ' + a + ', ' + k);
      if (0 > a || a >= this.width) throw Error('Bitmask: x must be at least 0 and less than width: ' + a);
      if (0 > k || k >= this.height) throw Error('Bitmask: y must be at least 0 and less than height: ' + k);
      this.g[k * this.width + a] = n;
    }
    
    P(...a) {
      for (let k = 0; k < this.g.length; k++) this.g[k] = a[k % a.length];
    }
  }
  
  class m {
    constructor(a) {
      this.a =
        1103515245;
      this.c = 12345;
      this.g = a ? a : Math.floor(2147483647 * Math.random());
    }
    
    next() {
      this.g = (this.a * this.g + this.c) % 2147483648;
      return this.g / 2147483647;
    }
  }
  
  qrsvg.Bitmask = d;
  qrsvg.Contour = b;
  qrsvg.PRNG = m;
  qrsvg.makePathSpecRound = G;
  qrsvg.addJitterToPathSpec = v;
  qrsvg.compactPathSpec = w;
  qrsvg.calculateTileStyleContour = A;
  qrsvg.calculateShapeContour = c;
  qrsvg.calculateContour = function(a, k = 1, n = 'basic') {
    let h = new b;
    if (16 < a.width && 16 < a.height) {
      for (var q of [[k, k], [a.width + k - 7, k], [k, a.height + k - 7]]) h.g.push('M' + q[0] + ' ' + q[1]), h.g.push(...Array(7).fill('h1')), h.g.push(...Array(7).fill('v1')),
        h.g.push(...Array(7).fill('h-1')), h.g.push(...Array(7).fill('v-1')), h.g.push('z'), h.g.push('M' + (q[0] + 1) + ' ' + (q[1] + 1)), h.g.push(...Array(5).fill('v1')), h.g.push(...Array(5).fill('h1')), h.g.push(...Array(5).fill('v-1')), h.g.push(...Array(5).fill('h-1')), h.g.push('z'), h.h.push('M' + (q[0] + 2) + ' ' + (q[1] + 2)), h.h.push(...Array(3).fill('h1')), h.h.push(...Array(3).fill('v1')), h.h.push(...Array(3).fill('h-1')), h.h.push(...Array(3).fill('v-1')), h.h.push('z');
      ['dots', 'rounded', 'confetti', 'scanlines'].includes(n) &&
      (h.h = G(h.h), h.g = G(h.g));
    }
    if ('scanlines' == n) {
      if ('scanlines' != n) throw Error('Unsupported horizontal render style: ' + n);
      q = new b;
      for (let r = 0; r < a.height; r++) {
        var y = 0;
        let t = a.width;
        16 < a.width && 16 < a.height && (8 > r ? (y = 8, t = a.width - 8) : r > a.height - 8 && (y = 8));
        let l = [], u = [], z = [];
        var p = .03;
        let L = .1;
        a.get(y, r) && (p = .45, L = 0);
        l.push('M' + (y + p + k).toFixed(3) + ' ' + (r + .5 + p + L + k).toFixed(3));
        l.push('a' + p + ' ' + p + ' 0 0 1 0 ' + (-2 * p).toFixed(3));
        l.push('h' + (.8 - p).toFixed(3));
        u.push('h-0.8');
        for (y += 1; y < t; y++) p = (.9 - .06) / 2, a.get(y, r) &&
        !a.get(y - 1, r) && !a.get(y + 1, r) && y < t - 1 ? (z.push('M' + (y - .2 + k).toFixed(3) + ' ' + (r + .5 - .03 + .1 + k).toFixed(3)), z.push('c0.2 0 0.2 ' + (-1 * p - .1).toFixed(3) + ' 0.4 ' + (-1 * p - .1).toFixed(3)), z.push('h0.6'), z.push('c0.2 0 0.2 ' + (p + .1).toFixed(3) + ' 0.4 ' + (p + .1).toFixed(3)), z.push('v0.06'), z.push('c-0.2 0 -0.2 ' + (p - .1).toFixed(3) + ' -0.4 ' + (p - .1).toFixed(3)), z.push('h-0.6'), z.push('c-0.2 0 -0.2 ' + (-1 * p + .1).toFixed(3) + ' -0.4 ' + (-1 * p + .1).toFixed(3)), z.push('z'), l.push('v0.06'), l.push(...u.reverse()), u = [], l.push('z'), l.push('M' +
          (y + 1.2 + k).toFixed(3) + ' ' + (r + .63 + k).toFixed(3)), l.push('v-0.06'), y += 1) : a.get(y, r) && !a.get(y - 1, r) ? (l.push('c0.2 0 0.2 ' + (-1 * p - .1).toFixed(3) + ' 0.4 ' + (-1 * p - .1).toFixed(3)), u.push('c-0.2 0 -0.2 ' + (-1 * p + .1).toFixed(3) + ' -0.4 ' + (-1 * p + .1).toFixed(3))) : !a.get(y, r) && a.get(y - 1, r) ? (l.push('c0.2 0 0.2 ' + (p + .1).toFixed(3) + ' 0.4 ' + (p + .1).toFixed(3)), u.push('c-0.2 0 -0.2 ' + (p - .1).toFixed(3) + ' -0.4 ' + (p - .1).toFixed(3))) : (l.push('h0.4'), u.push('h-0.4')), l.push('h0.6'), u.push('h-0.6');
        l.push('h0.2');
        u.push('h-0.2');
        p = .03;
        a.get(t - 1, r) && (p = .45);
        l.push('h' + -1 * p);
        u.push('h' + p);
        l.push('a' + p + ' ' + p + ' 0 0 1 0 ' + 2 * p);
        l.push(...u.reverse());
        l.push('z');
        q.j = q.j.concat(l);
        q.i = q.i.concat(z);
      }
      a = q;
    } else a = ['dots', 'mosaic', 'confetti'].includes(n) ? A(a, k, n) : c(a, k, n);
    h.i = a.i;
    h.j = a.j;
    'rounded' == n && (h.j = G(h.j), h.i = G(h.i));
    n.startsWith('jitter-') ? (a = 0, 'jitter-heavy' == n ? a = .15 : 'jitter-light' == n && (a = .07), n = new m(1), h.j = v(h.j, a, n), h.i = v(h.i, a, n), h.h = v(h.h, a, n), h.g = v(h.g, a, n)) : (h.j = w(h.j), h.i = w(h.i), h.h = w(h.h), h.g = w(h.g));
    return h;
  };
  
  qrsvg.render = function(a, k, n = 'basic', h = 1) {
    if (!'basic rounded dots mosaic confetti scanlines jitter-light jitter-heavy'.split(' ').includes(n)) throw Error('Unsupported render style: ' + n);
    for (k.setAttribute('viewBox', '0 0 ' + (a.width + 2 * h) + ' ' + (a.height + 2 * h)); k.firstChild;) k.firstChild.remove();
    a = qrsvg.calculateContour(a, h, n);
    for (let q in a) n = document.createElementNS('http://www.w3.org/2000/svg', 'path'), n.setAttribute('d', a[q].join('')), k.appendChild(n);
  };
})(window.qrsvg);