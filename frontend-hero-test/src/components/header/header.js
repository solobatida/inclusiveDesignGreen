(function () {
  var MODULE_NAME = 'header';

  window.nn = window.nn || {};

  window.nn[MODULE_NAME] = function () {

    var _$ = {},
      _ = {
        defaultConfig: Object.freeze({
          VALUES: {
            velocityFactor: 2.5,
            scrollTimeoutMs: 25
          }
        }),
        scrollTimeoutID: undefined,
      },

      _addEventListener = function () {
        window.addEventListener('scroll', _onScroll);
        window.addEventListener('resize', _onScroll);
      },

      _removeEventListener = function() {
        window.removeEventListener('scroll', _onScroll);
        window.removeEventListener('resize', _onScroll);
      },

      _onScroll = function () {
        if (_.scrollTimeoutID) {
          return;
        }

        // add timeout to not block the GUI
        _.scrollTimeoutID = window.setTimeout(function () {
          var scrolledHeight = window.pageYOffset,
            offsetTop = _$.el.offsetTop,
            limit = _$.el.offsetTop + _$.el.offsetHeight;

          if (scrolledHeight > offsetTop && scrolledHeight <= limit) {
            _$.el.style.backgroundPositionY = -(scrolledHeight - offsetTop) /
               _.config.VALUES.velocityFactor + 'px';
          } else {
            _$.el.style.backgroundPositionY = '0';
          }
          window.clearTimeout(_.scrollTimeoutID);
          _.scrollTimeoutID = undefined;
        }, _.config.VALUES.scrollTimeoutMs);
      };

    return {
      init: function ($el, config) {
        _$.el = $el;
        _.config = Object.assign({}, _.defaultConfig, config);
        _addEventListener();
      },

      destroy: function () {
        _removeEventListener();
        _$.el = null;
      }
    };
  };
})();
