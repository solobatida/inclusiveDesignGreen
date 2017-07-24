(function() {
  var MODULE_NAME = 'shoppingcartModel',
    NETCENTRIC_NAMESPACE = 'nn';

  window[NETCENTRIC_NAMESPACE] = window[NETCENTRIC_NAMESPACE] || {};

  window[NETCENTRIC_NAMESPACE][MODULE_NAME] = function() {
    var _defaultState = {
          products: [],
          total: {
            beforeVAT: 0,
            afterVAT: 0,
            VAT: 0
          },
          VATRate: null
      },
      _state = {},

      _getDeepCloneOfObject = function(object) {
        return JSON.parse(JSON.stringify(object));
      },

      _ensureArray = function(item) {
        if (item.constructor !== Array) {
          item = [item];
        }
        return item;
      },

      _setupState = function(state) {
        state = state || {};
        _state = Object.assign(
          {},
          _getDeepCloneOfObject(_defaultState),
          _getDeepCloneOfObject(state)
        );
      },

      _getProductIndex = function(searchedProduct) {
        return _state.products.findIndex(function(product) {
          return searchedProduct.name === product.name;
        });
      },

      _removeProduct = function(product) {
        var productIndex = _getProductIndex(product);

        if (productIndex !== -1) {
          _state.products.splice(productIndex, 1);
        }
      },

      _changeProductQuantity = function(productIndex, newQuantity) {
        if (newQuantity >= 1) {
          _state.products[productIndex].quantity = newQuantity;
        }
      },

      _incrementProductQuantity = function(productIndex, quantityToAdd) {
        _state.products[productIndex].quantity += quantityToAdd;
      },

      _addProduct = function(product) {
        _state.products.push(product);
      },

      _getTotalData = function(products, VATRate) {
        var beforeVAT = products.reduce(function(previousResult, product) {
          return previousResult + (product.quantity * product.price);
        }, 0),
          afterVAT = beforeVAT,
          VAT = 0;

        if (VATRate && VATRate > 0) {
          VAT = (beforeVAT / 100) * VATRate;
          afterVAT += VAT;
        }
        return {
          beforeVAT: beforeVAT,
          afterVAT: afterVAT,
          VAT: VAT
        };
      },

      _getCart = function() {
        return {
          total: _getTotalData(_state.products, _state.VATRate),
          products: _state.products
        };
      };

    return {
      init: function(initialState) {
        _setupState(initialState);
      },

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
        _ensureArray(newOrExistingProducts).forEach(function(newOrExistingProduct) {
          // make sure to create a newly referenced object
          // to avoid introducing inconsistencies with outside
          // modifications of the object
          var product = _getDeepCloneOfObject(newOrExistingProduct),
            productIndex = _getProductIndex(product);

          // if no quantity was defined, set it to 1
          product.quantity = product.quantity || 1;

          if (productIndex === -1) {
            _addProduct(product);
          }
          // as the product does already exist, increment its quantity
          else {
            _incrementProductQuantity(productIndex, product.quantity);
          }
        });
        return _getCart();
      },

      changeProductQuantity: function(product, newQuantity) {
        var productIndex = _getProductIndex(product);

        _changeProductQuantity(productIndex, newQuantity);
        return _getCart();
      },

      removeProducts: function(productsToDelete) {
        _ensureArray(productsToDelete).forEach(_removeProduct);
        return _getCart();
      },

      destroy: function() {
        _setupState();
      }
    };
  };
})();
