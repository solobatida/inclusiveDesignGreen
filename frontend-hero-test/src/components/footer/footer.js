(function() {
  var MODULE_NAME = 'footer';

  window.nn = window.nn || {};

  window.nn[MODULE_NAME] = function() {

    var _$ = {},
      _printFullYear = function(el) {
        _$.el.innerHTML = el.year;
      };

    return {
      init: function(el, config) {
        _$.el = el;
        _printFullYear(config);
      },

      destroy: function() {
        _$.el = null;
      }
    };
  };
})();
