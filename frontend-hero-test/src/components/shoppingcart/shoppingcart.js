(function() {
  var MODULE_NAME = 'shoppingcart';

  window.nn = window.nn || {};

  window.nn[MODULE_NAME] = function() {

    var _$ = {},
    _ = {
      defaultConfig: Object.freeze({
        CLASSES: {
          isHidden: 'is-hidden',
          cartIsEmptyMessage: MODULE_NAME + '__cartIsEmptyMessage',
          listings: MODULE_NAME + '__listings',
          listing: MODULE_NAME + '__listing',
          listingName: MODULE_NAME + '__listingName',
          listingDescription: MODULE_NAME + '__listingDescription',
          listingPrice: MODULE_NAME + '__listingPrice',
          listingQuantity: MODULE_NAME + '__listingQuantity',
          listingAdd: MODULE_NAME + '__listingChange--add',
          listingSubstract: MODULE_NAME + '__listingChange--substract',
          priceBeforeVAT: MODULE_NAME + '__priceBeforeVAT',
          priceAfterVAT: MODULE_NAME + '__priceAfterVAT',
          VAT: MODULE_NAME + '__VAT',
          removeListing: MODULE_NAME + '__removeListing',
          checkout: MODULE_NAME + '__checkout',
          VATRate: MODULE_NAME + '__VATRate'
        },
        IDS: {
          form: MODULE_NAME + '-form'
        },
        EVENTS: {
          addProductToCart: 'addProductToCart'
        },
        ATTRIBUTES: {
          listingData: 'data-' + MODULE_NAME + '-listing'
        },
        intlOptions: {
          style: 'currency',
          currency: 'EUR'
        }
      })
    },

    _getParentOfNodeWithClass = function(node, className) {
      while(node != document.body) {
          node = node.parentNode;

          if (node.classList.contains(className)) {
              return node;
         }
      }
    },

    _renderListing = function(listingData) {
      var $listing = _$.listingTemplate.cloneNode(true),
        $listingName = $listing.querySelector('.' + _.config.CLASSES.listingName),
        $listingDescription = $listing.querySelector('.' + _.config.CLASSES.listingDescription),
        $listingPrice = $listing.querySelector('.' + _.config.CLASSES.listingPrice),
        $listingQuantity = $listing.querySelector('.' + _.config.CLASSES.listingQuantity);

      $listingName.innerHTML = listingData.name;
      $listingDescription.innerHTML = listingData.description;
      $listingPrice.innerHTML = _.currencyFormatter.format(listingData.price);
      $listingQuantity.value = listingData.quantity;
      $listing.setAttribute(_.config.ATTRIBUTES.listingData, JSON.stringify(listingData));

      _$.listings.appendChild($listing);
      $listing = null;
      $listingName = null;
      $listingDescription = null;
      $listingPrice = null;
      $listingQuantity = null;
    },

    _renderListings = function(listings) {
      listings.forEach(_renderListing);
    },

    _renderTotal = function(total) {
      _$.priceBeforeVAT.innerHTML = _.currencyFormatter.format(total.beforeVAT);
      _$.priceAfterVAT.innerHTML = _.currencyFormatter.format(total.afterVAT);
      _$.VAT.innerHTML = _.currencyFormatter.format(total.VAT);
    },

    _renderCart = function(cartData) {
      _emptyListings();

      if (cartData) {
        _renderListings(cartData.products);
        _renderTotal(cartData.total);
      }
      if (_$.listings.children.length) {
        _$.form.classList.remove(_.config.CLASSES.isHidden);
        _$.cartIsEmptyMessage.classList.add(_.config.CLASSES.isHidden);
      }
      else {
        _$.form.classList.add(_.config.CLASSES.isHidden);
        _$.cartIsEmptyMessage.classList.remove(_.config.CLASSES.isHidden);
      }
    },

    _addProduct = function(productData) {
      var cartData = _.model.addProducts(productData);

      _renderCart(cartData);
    },

    _onEventAddProductToCart = function(event) {
      _addProduct(JSON.parse(event.detail));
    },

    _setupModel = function(config) {
      var modelConfig = {};

      if (config.VATRate) {
          modelConfig.VATRate = config.VATRate;
      }
      _.model = window.nn.shoppingcartModel();
      _.model.init(modelConfig);
    },

    _emptyListings = function() {
      _$.listings.innerHTML = '';
    },

    _initialDOMChanges = function() {
      _$.VATRate.innerHTML = _.config.VATRate;
      _emptyListings();
    },

    _undoDOMChanges = function() {
      _$.listings.innerHTML = _$.listingTemplate.innerHTML;
    },

    _getListingData = function(nodeRemoveButton) {
      var $listing = _getParentOfNodeWithClass(
          nodeRemoveButton, _.config.CLASSES.listing),
          listingData = $listing.getAttribute(_.config.ATTRIBUTES.listingData);

      $listing = null;
      return JSON.parse(listingData);
    },

    _onClickInListings = function(event) {
      var listingData,
          cartData;

      // why not place event.stopPropagation() as well here?
      // because the event might be important also in another context
      // e.g. User Interaction Analytics
      event.preventDefault();

      if (event.target.classList.contains(_.config.CLASSES.removeListing)) {
        listingData = _getListingData(event.target);
        cartData = _.model.removeProducts(listingData);
        _renderCart(cartData);
      }
      else if (event.target.classList.contains(_.config.CLASSES.listingAdd)) {
        listingData = _getListingData(event.target);
        cartData = _.model.changeProductQuantity(listingData, listingData.quantity + 1);
        _renderCart(cartData);
      }
      else if (event.target.classList.contains(_.config.CLASSES.listingSubstract)) {
        listingData = _getListingData(event.target);
        cartData = _.model.changeProductQuantity(listingData, listingData.quantity - 1);
        _renderCart(cartData);
      }
    },

    _onInputInListings = function(event) {
      var listingData,
          cartData,
          newListingQuantity;

      if (event.target.classList.contains(_.config.CLASSES.listingQuantity)) {
        newListingQuantity = +event.target.value;
        listingData = _getListingData(event.target);
        cartData = _.model.changeProductQuantity(listingData, newListingQuantity);
        _renderCart(cartData);
      }
    },

    _onCheckoutCart = function() {
      _$.checkout.setAttribute('disabled', 'disabled');
      _$.checkout.innerHTML = 'Sending your order...';
    },

    _addEventListeners = function() {
      _$.checkout.addEventListener('click', _onCheckoutCart);
      document.addEventListener(_.config.EVENTS.addProductToCart, _onEventAddProductToCart);
      _$.listings.addEventListener('click', _onClickInListings);
      _$.listings.addEventListener('input', _onInputInListings);
    },

    _removeEventListeners = function() {
      _$.checkout.removeEventListener('click', _onCheckoutCart);
      document.removeEventListener(
        _.EVENTS.addProductToCart, _onEventAddProductToCart
      );
      _$.listings.removeEventListener('click', _onClickInListings);
      _$.listings.removeEventListener('input', _onInputInListings);
    },

    _initCurrencyFormatter = function() {
      // check if Intl API is available
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/
      // Reference/Global_Objects/Intl
      if (window.Intl) {
        _.currencyFormatter = new window.Intl.NumberFormat(
          navigator.language, _.config.intlOptions
        );
      }
      // otherwise just return the value with currency
      else {
        _.currencyFormatter = {
          format: function(value) {
            return value + _.config.intlOptions.currency;
          }
        };
      }
    },

    _setupVariables = function() {
      _$.cartIsEmptyMessage = _$.el.querySelector('.' + _.config.CLASSES.cartIsEmptyMessage);
      _$.priceBeforeVAT = _$.el.querySelector('.' + _.config.CLASSES.priceBeforeVAT);
      _$.priceAfterVAT = _$.el.querySelector('.' + _.config.CLASSES.priceAfterVAT);
      _$.VAT = _$.el.querySelector('.' + _.config.CLASSES.VAT);
      _$.VATRate = _$.el.querySelector('.' + _.config.CLASSES.VATRate);
      _$.listings = _$.el.querySelector('.' + _.config.CLASSES.listings);
      _$.listingTemplate = _$.el.querySelector('.' + _.config.CLASSES.listing);
      _$.form = _$.el.querySelector('#' + _.config.IDS.form);
      _$.checkout = _$.el.querySelector('.' + _.config.CLASSES.checkout);
    },

    _nullifyPropsInObject = function(object) {
      for (var prop in object) {
        if(object.hasOwnProperty(prop)) {
          object[prop] = null;
        }
      }
    };

    return {
      init: function($el, config) {
        _$.el = $el;
        _.config = Object.assign({}, _.defaultConfig, config);
        _setupModel(_.config);
        _setupVariables();
        _initCurrencyFormatter();
        _initialDOMChanges();
        _addEventListeners();
      },

      destroy: function() {
        _removeEventListeners();
        _undoDOMChanges();
        _$.el.classList.add(_.config.CLASSES.isHidden);
        _nullifyPropsInObject(_$);
      }
    };
  };
})();
