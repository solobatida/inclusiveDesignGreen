(function() {
  var MODULE_NAME = 'shop';

  window.nn = window.nn || {};

  window.nn[MODULE_NAME] = function() {

    var _$ = {},
      _ = {
        defaultConfig: Object.freeze({
          CLASSES: {
            addToCart: MODULE_NAME + '__addToCart'
          },
          ATTRIBUTES: {
            listingData: 'data-' + MODULE_NAME + '-listing'
          },
          EVENTS: {
            addProductToCart: 'addProductToCart'
          }
        })
      },

      _onClickedAddToCart = function(elementWithData) {
        // use deprecated createdEvent and initCustomEvent methods to support IE11
        // http://caniuse.com/#search=CustomEvent
        var customEvent = document.createEvent('CustomEvent'),
            listingData = elementWithData.getAttribute(_.config.ATTRIBUTES.listingData);

        customEvent.initCustomEvent(
          _.config.EVENTS.addProductToCart, true, true, listingData
        );
        document.dispatchEvent(customEvent);
      },

      _onClickedWithinComponent = function(event) {
        event.preventDefault();

        if (event.target.classList.contains(_.config.CLASSES.addToCart)) {
          _onClickedAddToCart(event.target);
        }
      },

      _addEventListener = function() {
        _$.el.addEventListener('click', _onClickedWithinComponent);
      },

      _removeEventListener = function() {
        _$.addToCartActions.removeEventListener('click', _onClickedWithinComponent);
      };

    return {
      init: function($el, config) {
        _$.el = $el;
        _.config = Object.assign({}, _.defaultConfig, config);
        _addEventListener();
      },

      destroy: function() {
        _removeEventListener();
        _$.el = null;
      }
    };
  };
})();
