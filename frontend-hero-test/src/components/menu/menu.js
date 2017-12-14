(function () {
  var MODULE_NAME = 'menu';

  window.nn = window.nn || {};

  window.nn[MODULE_NAME] = function () {

    //var $oneList = document.querySelectorAll('menu__principal li a');



    var _$ = {},
      _showMenu = function(el) {
      alert('mirta');
        _$.el.innerHTML = 'mirta';
      };

    return {
      init: function(el, config) {
        _$.el = el;
        _showMenu(config);
      },

      destroy: function() {
        _$.el = null;
      }
    };

  };
})();
