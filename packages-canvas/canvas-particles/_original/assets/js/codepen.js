// Generated by CoffeeScript 1.9.2
(function() {
  window.loadCodePen = function() {
    return $('.js-box-codepen').on('click', function() {
      var res = window.p.exportConfig();
      var res_json = JSON.stringify(res.js);
      var res_css = res.css;
      var stats_js = "var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);";
      var data = {
        title: 'particles.js demo',
        description: 'Made with particles.js, a lightweight JavaScript library for creating particles',
        html: '<!-- particles.js container --> <div id="particles-js"></div> <!-- stats - count particles --> <div class="count-particles"> <span class="js-count-particles">--</span> particles </div> <!-- particles.js lib - https://github.com/VincentGarreau/particles.js --> <script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- stats.js lib --> <script src="http://threejs.org/examples/js/libs/stats.min.js"></script>',
        html_pre_processor: '',
        css: '/* ---- reset ---- */ body{ margin:0; font:normal 75% Arial, Helvetica, sans-serif; } canvas{ display: block; vertical-align: bottom; } /* ---- particles.js container ---- */ #particles-js{ position:absolute; width: 100%; height: 100%; background-color: ' + res_css.background_color + '; background-image: url("' + res_css.background_image + '"); background-repeat: ' + res_css.background_repeat + '; background-size: ' + res_css.background_size + '; background-position: ' + res_css.background_position + '; } /* ---- stats.js ---- */ .count-particles{ background: #000022; position: absolute; top: 48px; left: 0; width: 80px; color: #13E8E9; font-size: .8em; text-align: left; text-indent: 4px; line-height: 14px; padding-bottom: 2px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; } .js-count-particles{ font-size: 1.1em; } #stats, .count-particles{ -webkit-user-select: none; margin-top: 5px; margin-left: 5px; } #stats{ border-radius: 3px 3px 0 0; overflow: hidden; } .count-particles{ border-radius: 0 0 3px 3px; }',
        css_pre_processor: '',
        css_starter: '',
        css_prefix: '',
        js: 'particlesJS("particles-js", ' + res_json + ');' + stats_js + ';',
        js_pre_processor: '',
        js_modernizr: '',
        js_library: '',
        html_classes: '',
        css_external: '',
        js_external: ''
      };
      var dataString = JSON.stringify(data);
      var data_input = document.getElementById('data-input');
      
      data_input.value = dataString;
      $('.js-codepen-button').click();
      
      return false;
    });
  };
}).call(this);
