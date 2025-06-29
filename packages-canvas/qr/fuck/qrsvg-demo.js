(() => {
  let H = document.querySelector('.qrsvgDemo > div:last-child svg'),
      theInput = document.querySelector('.qrsvgDemo input[type=text]');
  theInput.value = '';
  null != window.localStorage.getItem('qrsvgDemoConfig') && (document.querySelector('.qrsvgDemo #remember').checked = !0);
  var v = (e, f) => {
    let g = window.localStorage.getItem('qrsvgDemoConfig');
    if (null == g) return f;
    for (g = JSON.parse(g); 0 < e.length;) {
      if (!(e[0] in g)) return f;
      g = g[e[0]];
      e.splice(0, 1);
    }
    return g;
  };
  
  for (var w of document.querySelectorAll('.qrsvgDemo input[type=radio]')) {
    w.addEventListener('change', e => {
      e = e.target.id;
      for (let f of document.querySelectorAll('.qrsvgDemo div.colorMode')) f.style.display = f.classList.contains(e) ? 'colorModePalette' == e ? 'grid' : 'block' : 'none';
      E();
    });
  }
  
  document.getElementById(v(['color', 'colorMode'], 'colorModeSingle')).checked = 'checked';
  document.querySelector('div.' + v(['color', 'colorMode'], 'colorModeSingle')).style.display = 'block';
  
  for (let e of document.querySelectorAll('.qrsvgDemo .colorPicker')) e.querySelector('input[type=color]').addEventListener('change', () => {
    e.querySelector('input[type=text]').value =
        e.querySelector('input[type=color]').value;
    E();
  }), e.querySelector('input[type=text]').addEventListener('change', () => {
    let f = e.querySelector('input[type=text]').value;
    6 != f.length && 3 != f.length || !f.match(/^[0-9a-f]+$/i) || (f = '#' + f);
    if (4 != f.length || 7 != f.length || !f.match(/^#[0-9a-f]+$/i)) {
      let g = document.createElement('canvas').getContext('2d');
      g.fillStyle = f;
      f = g.fillStyle;
      f.startsWith('rgba(') && (f = f.split(',').slice(0, -1).join(',') + ')', g.fillStyle = f, f = g.fillStyle);
    }
    e.querySelector('input[type=text]').value !=
    f && (e.querySelector('input[type=text]').value = f);
    e.querySelector('input[type=color]').value = e.querySelector('input[type=text]').value;
    E();
  });
  for (let e of document.querySelectorAll('.qrsvgDemo div.colorModeSingle .colorPicker input')) e.value = v(['color', 'colorModeSingle', 'color'], '#000000');
  for (let e of document.querySelectorAll('.qrsvgDemo div.colorModeGradient .colorPicker input')) e.value = e.closest('div').nextSibling ? v(['color', 'colorModeGradient', 'color1'], '#62a0ea') : v(['color', 'colorModeGradient',
    'color2'], '#003f94');
  for (var A of document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker')) {
    w = Array.from(A.classList).filter(e => 'colorPicker' != e)[0].slice(8).toLowerCase();
    var c = void 0;
    'shapes' == w ? c = v(['color', 'colorModePalette', 'shapes'], '#3f7d20') : 'dots' == w ? c = v(['color', 'colorModePalette', 'dots'], '#9141ac') : 'pdpinner' == w ? c = v(['color', 'colorModePalette', 'eyesInner'], '#1a5fb4') : 'pdpouter' == w && (c = v(['color', 'colorModePalette', 'eyesOuter'], '#0d0a0b'));
    A.querySelector('input[type=text]').value =
        c;
    A.querySelector('input[type=color]').value = c;
  }
  for (var b of document.querySelectorAll('.qrsvgDemo .backgroundConfig .colorPicker input')) b.value = v(['color', 'backgroundColor'], '#ffffff');
  for (let e of document.querySelectorAll('.qrsvgDemo .logoColorizeConfig .colorPicker input')) e.value = v(['logo', 'colorOverrideColor'], '#ff7700');
  let d = document.querySelector('.qrsvgDemo button#colorGradientSwap');
  d.addEventListener('click', () => {
    let e = d.previousSibling.querySelector('input[type=color]'), f = d.nextSibling.querySelector('input[type=color]'),
        g = e.value;
    e.value = f.value;
    f.value = g;
    E();
  });
  for (let e of document.querySelectorAll('.qrsvgDemo button.gradientType')) e.getAttribute('aria-label').split(' ')[0].toLowerCase() == v(['color', 'colorModeGradient', 'gradientType'], 'linear') ? e.classList.add('active') : e.classList.remove('active'), e.setAttribute('title', e.getAttribute('aria-label')), e.addEventListener('click', f => {
    let g = document.querySelector('.qrsvgDemo button.gradientType.active');
    g && g.classList.remove('active');
    f.target.closest('button').classList.add('active');
    E();
  });
  let m = document.querySelector('.qrsvgDemo div.colorModeGradient input[type=range]');
  m.value = v(['color', 'colorModeGradient', 'position'], '1');
  m.setAttribute('title', 'Position ' + m.value);
  m.addEventListener('input', () => {
    m.setAttribute('title', 'Position ' + m.value);
    E();
  });
  let a = document.querySelector('.qrsvgDemo .backgroundConfig input[type=checkbox]');
  a.checked = v(['color', 'backgroundEnabled'], !0);
  a.checked || (A = a.parentNode, A.querySelector('label').innerText = 'Background', A.querySelector('.colorPicker').style.display =
      'none');
  a.addEventListener('change', () => {
    let e = a.parentNode;
    a.checked ? e.querySelectorAll('.colorPicker input').forEach(f => f.removeAttribute('disabled')) : e.querySelectorAll('.colorPicker input').forEach(f => f.setAttribute('disabled', 'disabled'));
    E();
  });
  A = new window.qrsvg.Bitmask(4, 4);
  A.P(!0, !0, !0, !0, !0, !1, !0, !1, !1, !0, !1, !0, !0, !1, !0, !0);
  for (var k of document.querySelectorAll('.qrsvgDemo button.shape')) c = k.getAttribute('aria-label').toLowerCase().replace(/ /g, '-').replace(/[\(\)]/g, ''), c == v(['shape'],
      'basic') ? k.classList.add('active') : k.classList.remove('active'), k.setAttribute('title', k.getAttribute('aria-label')), c = window.qrsvg.calculateContour(A, 1, c), b = document.createElementNS('http://www.w3.org/2000/svg', 'path'), b.setAttribute('d', Object.values(c).map(e => e.join('')).join('')), b.setAttribute('fill', '#000'), k.querySelector('svg').appendChild(b), k.addEventListener('click', e => {
    let f = document.querySelector('.qrsvgDemo button.shape.active');
    f && f.classList.remove('active');
    e.target.closest('button').classList.add('active');
    E();
  });
  let n = e => {
    let f = document.querySelector('.qrsvgDemo button.logo.active');
    f && f.classList.remove('active');
    e.classList.add('active');
  };
  for (let e of document.querySelectorAll('.qrsvgDemo button.logo')) k = e.getAttribute('aria-label').toLowerCase(), e.setAttribute('title', e.getAttribute('aria-label')), k == v(['logo', 'logo'], 'No logo').toLowerCase() ? e.classList.add('active') : e.classList.remove('active'), e.addEventListener('click', f => {
    f = f.target.closest('button');
    if (f.classList.contains('custom')) f = document.createElement('input'),
        f.type = 'file', f.accept = '.png,.jpg,.jpeg,.gif,.webp,image/jpeg,image/png,image/gif,image/webp', f.style.display = 'none', f.value = '', f.addEventListener('change', g => {
      (g = g.target.files) && 0 < g.length && q(g[0]);
    }), f.click(); else {
      let g = document.querySelector('.qrsvgDemo button.logo.custom');
      g.image && delete g.image;
      n(f);
      E();
    }
  });
  let h = document.querySelector('.qrsvgDemo .logoColorizeConfig input[type=checkbox]');
  h.checked = v(['logo', 'colorOverrideEnabled'], !1);
  h.addEventListener('change', () => {
    let e = h.parentNode;
    h.checked ?
        e.querySelectorAll('.colorPicker input').forEach(f => f.removeAttribute('disabled')) : e.querySelectorAll('.colorPicker input').forEach(f => f.setAttribute('disabled', 'disabled'));
    E();
  });
  
  let q = e => {
    let f = new FileReader;
    f.addEventListener('load', () => {
      let g = document.querySelector('.qrsvgDemo button.logo.custom');
      g.image = {};
      g.image.content = f.result;
      let x = new Image;
      x.addEventListener('load', () => {
        g.image.width = x.width;
        g.image.height = x.height;
        n(g);
        let B = document.querySelector('.qrsvgDemo p.error.logoError');
        B &&
        B.remove();
        E();
      });
      x.src = f.result;
    });
    if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(e.type)) f.readAsDataURL(e); else {
      let g = document.querySelector('.qrsvgDemo p.error.logoError');
      if (!g) {
        g = document.createElement('p');
        g.classList.add('error', 'logoError');
        let x = document.querySelector('.qrsvgDemo .logoColorizeConfig');
        x.parentNode.insertBefore(g, x);
      }
      g.innerText = 'Unsupported file type: ' + e.type;
    }
  }, y = document.querySelector('.qrsvgDemo #eccLevel');
  y.value = v(['advanced', 'eccLevel'], 'HIGH');
  y.addEventListener('change',
      () => {
        E();
      });
  let p = document.querySelector('.qrsvgDemo #quietZone');
  p.value = v(['advanced', 'quietZone'], 1).toString();
  p.addEventListener('change', () => {
    let e = p.value;
    '' === e ? p.value = '1' : 0 > parseInt(e, 10) ? p.value = '0' : 99 < parseInt(e, 10) && (p.value = '99');
    E();
  });
  let r = document.querySelector('.qrsvgDemo #compliantQuietZone');
  r.checked = v(['advanced', 'compliantQuietZone'], !1);
  r.checked && (p.value = '4');
  r.addEventListener('change', () => {
    r.checked ? (p.setAttribute('disabled', 'disabled'), p.dataset.previousValue = p.value,
        p.value = '4') : (p.removeAttribute('disabled'), p.dataset.previousValue ? p.value = p.dataset.previousValue : p.value = '1');
    E();
  });
  let t = () => {
    window.JSZip ? document.querySelectorAll('.qrsvgDemo .batchStatus button').forEach(e => {
      e.removeAttribute('disabled');
    }) : setTimeout(t, 100);
  }, l = document.querySelector('.qrsvgDemo #batchInput'), u = e => {
    let f = new FileReader;
    f.addEventListener('load', () => {
      var g = document.querySelector('.qrsvgDemo p.error.batchError');
      g && g.remove();
      g = f.result.split(/\r?\n|\r|\n/g).map(x => x.trim()).filter(x =>
          0 < x.length);
      if (0 < g.length) {
        l.urls = g;
        let x = document.querySelector('.qrsvgDemo .batchProgress span');
        x.innerText = g.length + ' URLs ready';
        x.style.background = 'none';
        document.querySelector('.qrsvgDemo .batchStatus').style.display = 'flex';
        t();
      } else g = document.querySelector('.qrsvgDemo p.error.batchError'), g || (g = document.createElement('p'), g.classList.add('error', 'batchError'), document.querySelector('.qrsvgDemo .batch').parentNode.insertBefore(g, document.querySelector('.qrsvgDemo .batchStatus').nextSibling)),
          g.innerText = 'Error: Text file seems to be empty.';
    });
    if ('text/plain' == e.type) f.readAsText(e); else {
      let g = document.querySelector('.qrsvgDemo p.error.batchError');
      g || (g = document.createElement('p'), g.classList.add('error', 'batchError'), document.querySelector('.qrsvgDemo .batch').parentNode.insertBefore(g, document.querySelector('.qrsvgDemo .batchStatus').nextSibling));
      g.innerText = 'Unsupported file type: ' + e.type;
      delete l.urls;
      document.querySelector('.qrsvgDemo .batchStatus').style.display = 'none';
    }
  };
  l.addEventListener('click',
      () => {
        if (!window.JSZip) {
          var e = document.createElement('script');
          e.src = '/jszip.min.js';
          document.body.appendChild(e);
        }
        e = document.createElement('input');
        e.type = 'file';
        e.accept = '.txt,text/plain';
        e.style.display = 'none';
        e.value = '';
        e.addEventListener('change', f => {
          (f = f.target.files) && 0 < f.length && u(f[0]);
        });
        e.click();
      });
  let z = e => {
    if (l.urls) {
      var f = [...l.urls], g = new window.JSZip, x = document.querySelector('.qrsvgDemo .batchProgress span');
      x.innerText = l.urls.length - f.length + ' / ' + l.urls.length;
      x.style.background = 'none';
      setTimeout(L, 0, e, f, g);
    }
  }, L = (e, f, g) => {
    if (0 == f.length) g.generateAsync({ type: 'blob' }).then(J => {
      J = URL.createObjectURL(J);
      let C = document.createElement('a');
      C.href = J;
      C.download = 'qr-codes.zip';
      C.style.display = 'none';
      document.body.appendChild(C);
      C.click();
      C.remove();
    }); else {
      var x = f[0], B = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      F(x, B);
      var D = J => {
        var C = l.urls.length - f.length + 1;
        let P = '' + C;
        for (; P.length < Math.floor(Math.log10(l.urls.length)) + 1;) P = '0' + P;
        P += ' - ' + x.replace(/[\/\\:\.]/g, '-') + '.' +
            e.toLowerCase();
        g.file(P, J);
        f = f.slice(1);
        J = document.querySelector('.qrsvgDemo .batchProgress span');
        J.innerText = C + ' / ' + l.urls.length;
        C = Math.round(100 * C / l.urls.length);
        J.style.background = 'linear-gradient(to right, #f70, #f70 ' + C + '%, transparent ' + C + '%, transparent)';
        setTimeout(L, 0, e, f, g);
      };
      'PNG' == e ? S(B, J => {
        J.toBlob(C => {
          D(C);
        });
      }) : 'SVG' == e && W(B, J => {
        D(J);
      });
    }
  };
  document.querySelector('.qrsvgDemo #batchPNG').addEventListener('click', () => {
    z('PNG');
  });
  document.querySelector('.qrsvgDemo #batchSVG').addEventListener('click', () => {
    z('SVG');
  });
  
  let E = () => {
    let e = theInput.value;
    0 == e.length && (e = theInput.getAttribute('placeholder'));
    document.querySelector('.qrsvgDemo #remember').checked && Z();
    F(e, H);
  }, F = (theoriginalUrl, thesvgelement) => {
    var g = window.qrcodegen.D.W(theoriginalUrl, window.qrcodegen.D.C[y.value]);
    const thesvgmargin = parseInt(p.value, 10);
    
    let bitmask = new window.qrsvg.Bitmask(g.size, g.size);
    for (var B = 0; B < g.size; B++) {
      for (let D = 0; D < g.size; D++) {
        bitmask.set(D, B, g.Y(D, B));
      }
    }
    
    let theqrstyle = document.querySelector('.qrsvgDemo button.shape.active').getAttribute('aria-label').toLowerCase().replace(/ /g, '-').replace(/[\(\)]/g, '');
    
    B = document.querySelector('.qrsvgDemo button.logo.active');
    let J = B.getAttribute('aria-label').toLowerCase();
    var C = Array.from(B.classList).filter(I => 'logo' != I && 'active' != I)[0], P = null;
    g = bitmask.width / 2;
    var M = null, T = null;
    P = null;
    
    'convex' == C && (M = document.createElement('canvas'), P = B.querySelector('svg'), T = P.getAttribute('viewBox').split(' ').slice(2).map(I => parseInt(I, 10)), M.width = T[0] + 200, M.height = T[1] + 200, T = M.getContext('2d'), P = new Path2D('M100 100' + P.dataset.convexPath));
    for (let I = 0; I < bitmask.width; I++) for (let O =
        0; O < bitmask.height; O++) if ('circle' == C) Math.sqrt(Math.pow(I + .5 - g, 2) + Math.pow(O + .5 - g, 2)) <= .5 + Math.ceil(.3 * bitmask.width / 2) && bitmask.set(I, O, !1); else if ('rect' == C) {
      var R = Math.ceil(.3 * bitmask.width / 2);
      Math.abs(I + .5 - g) <= R && Math.abs(O + .5 - g) <= R && bitmask.set(I, O, !1);
    } else if ('convex' == C) {
      var U = M.width - 200, V = M.height - 200;
      R = (I - g) / (.3 * bitmask.width) * U + M.width / 2;
      var X = (O - g) / (.3 * bitmask.height) * V + M.height / 2;
      U = (I + 1 - g) / (.3 * bitmask.width) * U + M.width / 2;
      V = (O + 1 - g) / (.3 * bitmask.height) * V + M.height / 2;
      for (var N of [[R, X], [U, X], [R, V], [U, V]]) T.isPointInPath(P, N[0], N[1]) && bitmask.set(I,
          O, !1);
    } else 'custom' == C && 'custom image' == J && B.image && (R = .3 * bitmask.width / Math.max(B.image.width, B.image.height), X = B.image.height * R / 2 + 1, Math.abs(I + .5 - g) <= B.image.width * R / 2 + 1 && Math.abs(O + .5 - g) <= X && bitmask.set(I, O, !1));
    
    window.qrsvg.render(bitmask, thesvgelement, theqrstyle, thesvgmargin);
    
    thesvgelement == H && (thesvgelement.style.transform = 'scale(' + (1 + 2 / bitmask.height).toFixed(5) + ')');
    a.checked && (N = document.createElementNS('http://www.w3.org/2000/svg', 'rect'), N.setAttribute('x', '0'), N.setAttribute('y', '0'), N.setAttribute('width', bitmask.width + 2 * thesvgmargin), N.setAttribute('height', bitmask.height + 2 * thesvgmargin), N.setAttribute('fill',
        document.querySelector('.qrsvgDemo .backgroundConfig input[type=color]').value), thesvgelement.insertBefore(N, thesvgelement.firstChild));
    N = document.querySelector('.qrsvgDemo input[type=radio]:checked').id.slice(9).toLowerCase();
    if ('single' == N) {
      var K = document.querySelector('.qrsvgDemo div.colorModeSingle .colorPicker input[type=color]').value;
      for (var Q of thesvgelement.children) 'path' == Q.tagName.toLowerCase() && Q.setAttribute('fill', K);
    } else if ('gradient' == N) {
      Q = document.querySelector('.qrsvgDemo div.colorModeGradient .colorPicker:first-child input[type=color]').value;
      var Y = document.querySelector('.qrsvgDemo div.colorModeGradient .colorPicker:last-child input[type=color]').value;
      theqrstyle = document.querySelector('.qrsvgDemo div.colorModeGradient input[type=range]').value;
      N = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      C = 'linear';
      (M = document.querySelector('.qrsvgDemo button.gradientType.active')) && (C = M.getAttribute('aria-label').split(' ')[0].toLowerCase());
      'linear' == C ? (M = [.5, .75, 1, 1, 1, 1, 1, .75, .5, .25, 0, 0, 0, 0, 0, .25], C = document.createElementNS('http://www.w3.org/2000/svg',
          'linearGradient'), C.setAttribute('x1', M[(theqrstyle - 1) % 16] * bitmask.height + thesvgmargin), C.setAttribute('x2', M[(theqrstyle - 1 + 8) % 16] * bitmask.height + thesvgmargin), C.setAttribute('y1', (1 - M[(theqrstyle - 1 + 4) % 16]) * bitmask.height + thesvgmargin), C.setAttribute('y2', (1 - M[(theqrstyle - 1 + 12) % 16]) * bitmask.height + thesvgmargin)) : (C = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient'), C.setAttribute('cx', [.5, .25, .25, .5, .75, .75, .75, .5, .25, 0, 0, 0, 0, .25, .5, .75][theqrstyle - 1] * bitmask.width + thesvgmargin), C.setAttribute('cy', [.5, .5, .25, .25, .25, .5, .75, .75, .75, .75, .5, .25, 0, 0, 0, 0][theqrstyle - 1] * bitmask.height + thesvgmargin), C.setAttribute('r', (bitmask.height + 2) / Math.sqrt(2)));
      C.setAttribute('gradientUnits', 'userSpaceOnUse');
      theqrstyle = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      theqrstyle.setAttribute('stop-color', Q);
      theqrstyle.setAttribute('offset', '0');
      C.appendChild(theqrstyle);
      theqrstyle = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      theqrstyle.setAttribute('stop-color', Y);
      theqrstyle.setAttribute('offset', '1');
      C.appendChild(theqrstyle);
      C.id = 'mainGradient';
      N.appendChild(C);
      thesvgelement.insertBefore(N, thesvgelement.firstChild);
      for (K of thesvgelement.children) 'path' == K.tagName.toLowerCase() && K.setAttribute('fill', 'url(#mainGradient)');
    } else if ('palette' ==
        N) {
      K = [...document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker input[type=color]')].map(I => I.value);
      for (Y of thesvgelement.children) 'path' == Y.tagName.toLowerCase() && Y.setAttribute('fill', K.pop());
    }
    thesvgelement.hasAttribute('xmlns:xlink') && thesvgelement.removeAttribute('xmlns:xlink');
    if (J && !['no logo', 'empty circle', 'empty square'].includes(J)) if ('custom image' == J) g = document.querySelector('.qrsvgDemo button.logo.custom'), g.image && (Q = .3 * bitmask.width / Math.max(g.image.width, g.image.height), K = document.createElementNS('http://www.w3.org/2000/svg',
        'image'), B = g.image.width * Q, Q *= g.image.height, K.setAttribute('width', B.toFixed(4)), K.setAttribute('height', Q.toFixed(4)), K.setAttribute('x', ((bitmask.width + 2 * thesvgmargin - B) / 2).toFixed(4)), K.setAttribute('y', ((bitmask.height + 2 * thesvgmargin - Q) / 2).toFixed(4)), K.setAttributeNS('http://www.w3.org/1999/xlink', 'href', g.image.content), thesvgelement.hasAttribute('xmlns:xlink') || thesvgelement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink'), thesvgelement.appendChild(K)); else {
      B = B.querySelector('svg');
      B.hasAttribute('xmlns:xlink') && thesvgelement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      Q = parseInt(B.getAttribute('viewBox').split(' ')[2], 10);
      K = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      K.setAttribute('transform', ['translate(' + (thesvgmargin + .7 * g).toFixed(4) + ' ' + (thesvgmargin + .7 * g).toFixed(4) + ')', 'scale(' + (.3 * bitmask.width / Q).toFixed(4) + ')'].join(' '));
      K.innerHTML = B.innerHTML.replace(/GradientTemplate/g, 'Gradient').replace(/PathTemplate/g, 'Path').replace(/FilterTemplate/g, 'Filter');
      if (K.querySelector('defs')) {
        g = thesvgelement.querySelector('defs');
        B = K.querySelector('defs');
        g || (g = document.createElementNS('http://www.w3.org/2000/svg',
            'defs'), thesvgelement.insertBefore(g, thesvgelement.firstChild));
        for (; 0 < B.children.length;) g.appendChild(B.children[0]);
        K.querySelector('defs').remove();
      }
      if (document.querySelector('#enableLogoColorize').checked) {
        let I = document.querySelector('.logoColorizeConfig input[type=color]').value;
        K.querySelectorAll('*[fill]').forEach(O => {
          let aa = O.getAttribute('fill').toLowerCase();
          ['#fff', '#ffffff'].includes(aa) || 'doi' == J && '#231f20' == aa || O.setAttribute('fill', I);
        });
      }
      thesvgelement.appendChild(K);
    }
    if (thesvgelement == H) {
      for (let I of document.querySelectorAll('.qrsvgDemo .stats div:first-child span')) I.innerText =
          bitmask.width;
      for (let I of document.querySelectorAll('.qrsvgDemo .stats div:last-child span')) I.innerText = bitmask.width + 2 * thesvgmargin;
    }
  };
  theInput.addEventListener('blur', () => {
    let e = null;
    try {
      e = new URL(theInput.value);
    } catch (g) {
    }
    let f = document.querySelector('.qrsvgDemo p.urlError');
    null === e && 0 < theInput.value.length ? (f || (f = document.createElement('p'), f.classList.add('urlError'), theInput.nextSibling.insertBefore(f, theInput.nextSibling.firstChild)), f.innerHTML = '<strong>This text does not seem to be a valid URL.</strong> You can put whatever text you want into a QR code, but if you are trying to create a code that leads to a website, please make sure to test it before use.') :
        f && f.remove();
    E();
  });
  let S = (e, f) => {
    let g = parseInt(e.getAttribute('viewBox').split(' ')[2], 10),
        x = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
    e.hasAttribute('xmlns:xlink') && (x += ' xmlns:xlink="http://www.w3.org/1999/xlink"');
    x = x + (' viewBox="0 0 ' + g + ' ' + g + '">') + (e.innerHTML + '</svg>');
    e = navigator.userAgent.toLowerCase();
    if (-1 == e.indexOf('gecko') || -1 < e.indexOf('like gecko')) x = x.replace(/ class="qrsvg-blend-overlay"/g, ' style="mix-blend-mode: overlay;"');
    let B = document.createElement('img');
    B.addEventListener('load',
        () => {
          let D = 50 * g;
          200 < g ? D = 12 * g : 100 < g ? D = 20 * g : 50 < g && (D = 32 * g);
          let J = document.createElement('canvas');
          J.width = D;
          J.height = D;
          J.getContext('2d').drawImage(B, 0, 0, D, D);
          f(J);
        });
    B.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(x);
  };
  document.querySelector('.qrsvgDemo .downloadPng').addEventListener('click', () => {
    S(H, e => {
      e = e.toDataURL('image/png');
      let f = document.createElement('a');
      f.setAttribute('href', e);
      f.setAttribute('download', 'qr-code.png');
      f.style.display = 'none';
      document.body.appendChild(f);
      f.click();
      f.remove();
    });
  });
  let W = (e, f) => {
    let g = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
    e.hasAttribute('xmlns:xlink') && (g += ' xmlns:xlink="http://www.w3.org/1999/xlink"');
    g += ' viewBox="' + e.getAttribute('viewBox') + '">';
    g = g + '\x3c!-- Created with: https://fietkau.software/qr --\x3e' + (e.innerHTML + '</svg>');
    g = g.replace(/ class="qrsvg-blend-overlay"/g, ' style="mix-blend-mode: overlay;"');
    f(g);
  };
  document.querySelector('.qrsvgDemo .downloadSvg').addEventListener('click', () => {
    W(H, e => {
      let f = document.createElement('a');
      f.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(e));
      f.setAttribute('download', 'qr-code.svg');
      f.style.display = 'none';
      document.body.appendChild(f);
      f.click();
      f.remove();
    });
  });
  let Z = () => {
    var e = window.localStorage, f = e.setItem, g = JSON, x = g.stringify;
    let B = {
      color: {
        colorMode: document.querySelector('.qrsvgDemo input[type=radio]:checked').id,
        colorModeSingle: { color: document.querySelector('.qrsvgDemo div.colorModeSingle .colorPicker input[type=color]').value },
        colorModeGradient: {
          color1: document.querySelector('.qrsvgDemo div.colorModeGradient .colorPicker:first-child input[type=color]').value,
          color2: document.querySelector('.qrsvgDemo div.colorModeGradient .colorPicker:last-child input[type=color]').value,
          position: document.querySelector('.qrsvgDemo div.colorModeGradient input[type=range]').value,
          gradientType: document.querySelector('.qrsvgDemo button.gradientType.active').getAttribute('aria-label').split(' ')[0].toLowerCase()
        },
        colorModePalette: {
          shapes: document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker input[type=color]')[0].value,
          dots: document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker input[type=color]')[1].value,
          eyesInner: document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker input[type=color]')[2].value,
          eyesOuter: document.querySelectorAll('.qrsvgDemo div.colorModePalette .colorPicker input[type=color]')[3].value
        },
        backgroundColor: document.querySelector('.qrsvgDemo .backgroundConfig input[type=color]').value,
        backgroundEnabled: document.querySelector('.qrsvgDemo .backgroundConfig input[type=checkbox]').checked
      },
      shape: document.querySelector('.qrsvgDemo button.shape.active').getAttribute('aria-label').toLowerCase().replace(/ /g,
          '-').replace(/[\(\)]/g, ''),
      logo: {
        logo: document.querySelector('.qrsvgDemo button.logo.active').getAttribute('aria-label'),
        colorOverrideEnabled: document.querySelector('.qrsvgDemo #enableLogoColorize').checked,
        colorOverrideColor: document.querySelector('.qrsvgDemo .logoColorizeConfig input[type=color]').value
      },
      advanced: {
        eccLevel: document.querySelector('.qrsvgDemo #eccLevel').value,
        quietZone: parseInt(document.querySelector('.qrsvgDemo #quietZone').value, 10),
        compliantQuietZone: document.querySelector('.qrsvgDemo #compliantQuietZone').checked
      }
    };
    'Custom image' == B.logo.logo && (B.logo.logo = 'No logo');
    f.call(e, 'qrsvgDemoConfig', x.call(g, B));
  }, ba = document.querySelector('.qrsvgDemo #remember');
  ba.addEventListener('change', () => {
    ba.checked ? Z() : window.localStorage.removeItem('qrsvgDemoConfig');
  });
  let ca = document.querySelector('#splash');
  v = () => {
    let e = ca.getBoundingClientRect();
    document.title.startsWith('QRSVG') && e.top + e.height > .6 * window.innerHeight && (document.title = document.title.replace('QRSVG', 'QR Code Generator'));
    document.title.startsWith('QR Code Generator') &&
    e.top + e.height < .4 * window.innerHeight && (document.title = document.title.replace('QR Code Generator', 'QRSVG'));
  };
  document.addEventListener('scroll', v);
  document.addEventListener('resize', v);
  
  v();
  E();
})();
