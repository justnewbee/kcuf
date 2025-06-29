(function(qrcodegen) {
  (function(G) {
    class v {
      constructor(w, A) {
        this.$ = w;
        this.g = A;
      }
      
      N(w) {
        return this.g[Math.floor((w + 7) / 17)];
      }
    }
    
    v.V = new v(1, [10, 12, 14]);
    v.R = new v(2, [9, 11, 13]);
    v.BYTE = new v(4, [8, 16, 16]);
    
    new v(8, [8, 10, 12]);
    new v(7, [0, 0, 0]);
    
    G.K = v;
  })(qrcodegen.L || (qrcodegen.L = {}));
})(window.qrcodegen);
