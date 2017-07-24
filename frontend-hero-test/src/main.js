(function () {
  var $shop = document.querySelector('.shop__base'),
    $shoppingcart = document.querySelector('.shoppingcart__base'),
    $footerYear = document.querySelector('.footer__year'),
    $headerBackground = document.querySelector('.header__background');

  window.nn.shop().init($shop);
  window.nn.shoppingcart().init($shoppingcart,
    {
      VATRate: 20,
      currency: '&euro;'
    }
  );
  window.nn.footer().init($footerYear,
    {
      year: new Date().getFullYear()
    }
  );
  window.nn.header().init($headerBackground, {
    velocityFactor: 2.5,
    scrollTimeoutMs: 25
  });
})();
