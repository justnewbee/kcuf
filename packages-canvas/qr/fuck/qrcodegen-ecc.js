(function(qrcodegen) {
  (function(G) {
    class v {
      constructor(w, A) {
        this.F = w;
        this.X = A;
      }
    }
    
    v.LOW = new v(0, 1);
    v.MEDIUM = new v(1, 0);
    v.QUARTILE = new v(2, 3);
    v.HIGH = new v(3, 2);
    G.C = v;
  })(qrcodegen.D || (qrcodegen.D = {}));
})(window.qrcodegen);
