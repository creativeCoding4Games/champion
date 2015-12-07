var ChampionEngine = require('./engine');
var Renderer = require('./render');

(function (document) {
  document.addEventListener('DOMContentLoaded', function () {
    // TODO - use client/server architecture instead
    var engine = new ChampionEngine();
    var renderer = new Renderer(document.getElementById('stage'));
    var session = engine.login(null, renderer);
    function step() {
      renderer.step();
      setTimeout(step, 1000/60);
    }
    step();
  });
})(document);
