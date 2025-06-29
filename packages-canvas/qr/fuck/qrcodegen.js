window.qrcodegen = {};

(function(H) {
  function G(c, b, d) {
    if (0 > b || 31 < b || 0 != c >>> b) throw new RangeError('Value out of range');
    for (--b; 0 <= b; b--) d.push(c >>> b & 1);
  }
  
  function v(c) {
    if (!c) throw Error('Assertion error');
  }
  
  class w {
    constructor(c, b, d, m) {
      this.version = c;
      this.A = b;
      this.g = [];
      this.l = [];
      if (c < w.m || c > w.l) throw new RangeError('Version value out of range');
      if (-1 > m || 7 < m) throw new RangeError('Mask value out of range');
      this.size = 4 * c + 17;
      c = [];
      for (b = 0; b < this.size; b++) c.push(!1);
      for (b = 0; b < this.size; b++) this.g.push(c.slice()), this.l.push(c.slice());
      this.J();
      d = this.G(d);
      this.I(d);
      if (-1 == m) for (d = 1E9, c = 0; 8 > c; c++) this.o(c), this.u(c), b = this.U(), b < d && (m = c, d = b), this.o(c);
      v(0 <= m && 7 >= m);
      this.o(m);
      this.u(m);
      this.l = [];
    }
    
    static W(c, b) {
      c = H.L.Z(c);
      return w.H(c, b);
    }
    
    static H(c, b) {
      if (!(1 >= w.m && 40 <= w.l)) throw new RangeError('Invalid value');
      let d;
      for (d = 1; ; d++) {
        var m = 8 * w.h(d, b);
        const h = A.s(c, d);
        if (h <= m) {
          m = h;
          break;
        }
        if (40 <= d) throw new RangeError('Data too long');
      }
      for (var a of [w.C.MEDIUM, w.C.QUARTILE, w.C.HIGH]) m <= 8 * w.h(d, a) && (b = a);
      a = [];
      for (var k of c) {
        G(k.mode.$, 4, a);
        G(k.O, k.mode.N(d), a);
        for (const h of k.getData()) a.push(h);
      }
      v(a.length == m);
      c = 8 * w.h(d, b);
      v(a.length <= c);
      G(0, Math.min(4, c - a.length), a);
      G(0, (8 - a.length % 8) % 8, a);
      v(0 == a.length % 8);
      for (k = 236; a.length < c; k ^= 253) G(k, 8, a);
      let n = [];
      for (; 8 * n.length < a.length;) n.push(0);
      a.forEach((h, q) => n[q >>> 3] |= h << 7 - (q & 7));
      return new w(d, b, n, -1);
    }
    
    Y(c, b) {
      return 0 <= c && c < this.size && 0 <= b && b < this.size && this.g[b][c];
    }
    
    J() {
      for (var c = 0; c < this.size; c++) this.h(6, c, 0 == c % 2), this.h(c, 6, 0 == c % 2);
      this.s(3, 3);
      this.s(this.size - 4, 3);
      this.s(3, this.size -
        4);
      c = this.T();
      const b = c.length;
      for (let d = 0; d < b; d++) for (let m = 0; m < b; m++) 0 == d && 0 == m || 0 == d && m == b - 1 || d == b - 1 && 0 == m || this.H(c[d], c[m]);
      this.u(0);
      this.S();
    }
    
    u(c) {
      var b = c = this.A.X << 3 | c;
      for (let d = 0; 10 > d; d++) b = b << 1 ^ 1335 * (b >>> 9);
      c = (c << 10 | b) ^ 21522;
      v(0 == c >>> 15);
      for (b = 0; 5 >= b; b++) this.h(8, b, 0 != (c >>> b & 1));
      this.h(8, 7, 0 != (c >>> 6 & 1));
      this.h(8, 8, 0 != (c >>> 7 & 1));
      this.h(7, 8, 0 != (c >>> 8 & 1));
      for (b = 9; 15 > b; b++) this.h(14 - b, 8, 0 != (c >>> b & 1));
      for (b = 0; 8 > b; b++) this.h(this.size - 1 - b, 8, 0 != (c >>> b & 1));
      for (b = 8; 15 > b; b++) this.h(8, this.size - 15 +
        b, 0 != (c >>> b & 1));
      this.h(8, this.size - 8, !0);
    }
    
    S() {
      if (!(7 > this.version)) {
        var c = this.version;
        for (var b = 0; 12 > b; b++) c = c << 1 ^ 7973 * (c >>> 11);
        c = this.version << 12 | c;
        v(0 == c >>> 18);
        for (b = 0; 18 > b; b++) {
          const d = 0 != (c >>> b & 1), m = this.size - 11 + b % 3, a = Math.floor(b / 3);
          this.h(m, a, d);
          this.h(a, m, d);
        }
      }
    }
    
    s(c, b) {
      for (let d = -4; 4 >= d; d++) for (let m = -4; 4 >= m; m++) {
        const a = Math.max(Math.abs(m), Math.abs(d)), k = c + m, n = b + d;
        0 <= k && k < this.size && 0 <= n && n < this.size && this.h(k, n, 2 != a && 4 != a);
      }
    }
    
    H(c, b) {
      for (let d = -2; 2 >= d; d++) for (let m = -2; 2 >= m; m++) this.h(c + m, b + d,
        1 != Math.max(Math.abs(m), Math.abs(d)));
    }
    
    h(c, b, d) {
      this.g[b][c] = d;
      this.l[b][c] = !0;
    }
    
    G(c) {
      var b = this.version, d = this.A;
      if (c.length != w.h(b, d)) throw new RangeError('Invalid argument');
      const m = w.v[d.F][b], a = w.u[d.F][b];
      b = Math.floor(w.o(b) / 8);
      const k = m - b % m, n = Math.floor(b / m);
      d = [];
      const h = w.I(a);
      for (let y = 0, p = 0; y < m; y++) {
        let r = c.slice(p, p + n - a + (y < k ? 0 : 1));
        p += r.length;
        const t = w.J(r, h);
        y < k && r.push(0);
        d.push(r.concat(t));
      }
      let q = [];
      for (let y = 0; y < d[0].length; y++) d.forEach((p, r) => {
        (y != n - a || r >= k) && q.push(p[y]);
      });
      v(q.length ==
        b);
      return q;
    }
    
    I(c) {
      if (c.length != Math.floor(w.o(this.version) / 8)) throw new RangeError('Invalid argument');
      let b = 0;
      for (let d = this.size - 1; 1 <= d; d -= 2) {
        6 == d && (d = 5);
        for (let m = 0; m < this.size; m++) for (let a = 0; 2 > a; a++) {
          const k = d - a, n = 0 == (d + 1 & 2) ? this.size - 1 - m : m;
          !this.l[n][k] && b < 8 * c.length && (this.g[n][k] = 0 != (c[b >>> 3] >>> 7 - (b & 7) & 1), b++);
        }
      }
      v(b == 8 * c.length);
    }
    
    o(c) {
      if (0 > c || 7 < c) throw new RangeError('Mask value out of range');
      for (let b = 0; b < this.size; b++) for (let d = 0; d < this.size; d++) {
        let m;
        switch (c) {
        case 0:
          m = 0 == (d + b) % 2;
          break;
        case 1:
          m = 0 == b % 2;
          break;
        case 2:
          m = 0 == d % 3;
          break;
        case 3:
          m = 0 == (d + b) % 3;
          break;
        case 4:
          m = 0 == (Math.floor(d / 3) + Math.floor(b / 2)) % 2;
          break;
        case 5:
          m = 0 == d * b % 2 + d * b % 3;
          break;
        case 6:
          m = 0 == (d * b % 2 + d * b % 3) % 2;
          break;
        case 7:
          m = 0 == ((d + b) % 2 + d * b % 3) % 2;
          break;
        default:
          throw Error('Unreachable');
        }
        !this.l[b][d] && m && (this.g[b][d] = !this.g[b][d]);
      }
    }
    
    U() {
      let c = 0;
      for (var b = 0; b < this.size; b++) {
        var d = !1, m = 0, a = [0, 0, 0, 0, 0, 0, 0];
        for (var k = 0; k < this.size; k++) this.g[b][k] == d ? (m++, 5 == m ? c += w.A : 5 < m && c++) : (this.m(m, a), d || (c += this.v(a) * w.g), d = this.g[b][k],
          m = 1);
        c += this.B(d, m, a) * w.g;
      }
      for (b = 0; b < this.size; b++) {
        d = !1;
        m = 0;
        a = [0, 0, 0, 0, 0, 0, 0];
        for (k = 0; k < this.size; k++) this.g[k][b] == d ? (m++, 5 == m ? c += w.A : 5 < m && c++) : (this.m(m, a), d || (c += this.v(a) * w.g), d = this.g[k][b], m = 1);
        c += this.B(d, m, a) * w.g;
      }
      for (b = 0; b < this.size - 1; b++) for (d = 0; d < this.size - 1; d++) m = this.g[b][d], m == this.g[b][d + 1] && m == this.g[b + 1][d] && m == this.g[b + 1][d + 1] && (c += w.B);
      b = 0;
      for (var n of this.g) b = n.reduce((h, q) => h + (q ? 1 : 0), b);
      n = this.size * this.size;
      n = Math.ceil(Math.abs(20 * b - 10 * n) / n) - 1;
      v(0 <= n && 9 >= n);
      c += n * w.G;
      v(0 <= c &&
        2568888 >= c);
      return c;
    }
    
    T() {
      if (1 == this.version) return [];
      const c = Math.floor(this.version / 7) + 2,
        b = 32 == this.version ? 26 : 2 * Math.ceil((4 * this.version + 4) / (2 * c - 2));
      let d = [6];
      for (let m = this.size - 7; d.length < c; m -= b) d.splice(1, 0, m);
      return d;
    }
    
    static o(c) {
      if (c < w.m || c > w.l) throw new RangeError('Version number out of range');
      let b = (16 * c + 128) * c + 64;
      if (2 <= c) {
        const d = Math.floor(c / 7) + 2;
        b -= (25 * d - 10) * d - 55;
        7 <= c && (b -= 36);
      }
      v(208 <= b && 29648 >= b);
      return b;
    }
    
    static h(c, b) {
      return Math.floor(w.o(c) / 8) - w.u[b.F][c] * w.v[b.F][c];
    }
    
    static I(c) {
      if (1 >
        c || 255 < c) throw new RangeError('Degree out of range');
      let b = [];
      for (var d = 0; d < c - 1; d++) b.push(0);
      b.push(1);
      d = 1;
      for (let m = 0; m < c; m++) {
        for (let a = 0; a < b.length; a++) b[a] = w.s(b[a], d), a + 1 < b.length && (b[a] ^= b[a + 1]);
        d = w.s(d, 2);
      }
      return b;
    }
    
    static J(c, b) {
      let d = b.map(() => 0);
      for (const m of c) {
        const a = m ^ d.shift();
        d.push(0);
        b.forEach((k, n) => d[n] ^= w.s(k, a));
      }
      return d;
    }
    
    static s(c, b) {
      if (0 != c >>> 8 || 0 != b >>> 8) throw new RangeError('Byte out of range');
      let d = 0;
      for (let m = 7; 0 <= m; m--) d = d << 1 ^ 285 * (d >>> 7), d ^= (b >>> m & 1) * c;
      v(0 == d >>> 8);
      return d;
    }
    
    v(c) {
      const b =
        c[1];
      v(b <= 3 * this.size);
      const d = 0 < b && c[2] == b && c[3] == 3 * b && c[4] == b && c[5] == b;
      return (d && c[0] >= 4 * b && c[6] >= b ? 1 : 0) + (d && c[6] >= 4 * b && c[0] >= b ? 1 : 0);
    }
    
    B(c, b, d) {
      c && (this.m(b, d), b = 0);
      b += this.size;
      this.m(b, d);
      return this.v(d);
    }
    
    m(c, b) {
      0 == b[0] && (c += this.size);
      b.pop();
      b.unshift(c);
    }
  }
  
  w.m = 1;
  w.l = 40;
  w.A = 3;
  w.B = 3;
  w.g = 40;
  w.G = 10;
  w.u = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28,
    28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]];
  w.v = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37,
    38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]];
  H.D = w;
  
  class A {
    constructor(c, b, d) {
      this.mode = c;
      this.O = b;
      this.M = d;
      if (0 > b) throw new RangeError('Invalid argument');
      this.M = d.slice();
    }
    
    static v(c) {
      let b = [];
      for (const d of c) G(d, 8, b);
      return new A(A.K.BYTE, c.length, b);
    }
    
    static A(c) {
      if (!A.l(c)) throw new RangeError('String contains non-numeric characters');
      let b = [];
      for (let d = 0; d < c.length;) {
        const m = Math.min(c.length - d, 3);
        G(parseInt(c.substr(d, m), 10), 3 * m + 1, b);
        d += m;
      }
      return new A(A.K.V, c.length, b);
    }
    
    static u(c) {
      if (!A.h(c)) throw new RangeError('String contains unencodable characters in alphanumeric mode');
      let b = [], d;
      for (d = 0; d + 2 <= c.length; d += 2) {
        let m = 45 * A.g.indexOf(c.charAt(d));
        m += A.g.indexOf(c.charAt(d + 1));
        G(m, 11, b);
      }
      d < c.length && G(A.g.indexOf(c.charAt(d)), 6, b);
      return new A(A.K.R, c.length, b);
    }
    
    static Z(c) {
      return '' == c ? [] : A.l(c) ? [A.A(c)] : A.h(c) ? [A.u(c)] : [A.v(A.B(c))];
    }
    
    static l(c) {
      return A.o.test(c);
    }
    
    static h(c) {
      return A.m.test(c);
    }
    
    getData() {
      return this.M.slice();
    }
    
    static s(c, b) {
      let d = 0;
      for (const m of c) {
        c = m.mode.N(b);
        if (m.O >= 1 << c) return Infinity;
        d += 4 + c + m.M.length;
      }
      return d;
    }
    
    static B(c) {
      c = encodeURI(c);
      let b = [];
      for (let d = 0; d < c.length; d++) '%' != c.charAt(d) ? b.push(c.charCodeAt(d)) : (b.push(parseInt(c.substr(d + 1, 2), 16)), d += 2);
      return b;
    }
  }
  
  A.o = /^[0-9]*$/;
  A.m = /^[A-Z0-9 $%*+.\/:-]*$/;
  A.g = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
  H.L = A;
})(window.qrcodegen);