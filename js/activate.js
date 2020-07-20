'use strict';

(function () {
  //  Functions
  var typeAddress = function (item) {
    window.data.addressInput.value = item.location.x + ', ' + item.location.y;
  };

  var setMinPrice = function () {
    switch (window.data.homeTypeSelect.value) {
      case 'bungalo':
        window.data.priceInput.min = window.data.MIN_BUNGALOW_PRICE;
        break;
      case 'flat':
        window.data.priceInput.min = window.data.MIN_FLAT_PRICE;
        break;

      case 'house':
        window.data.priceInput.min = window.data.MIN_HOUSE_PRICE;
        break;

      case 'palace':
        window.data.priceInput.min = window.data.MIN_PALACE_PRICE;
        break;
    }
  };

  var activatePage = function () {
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
  };

  // Variables
  var fieldsets = document.querySelectorAll('fieldset');

  // Code
  fieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });

  typeAddress(window.data.ads[0]);
  setMinPrice();

  // Events
  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.pins.renderPins();
    }
  });

  window.data.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.pins.renderPins();
    }
  });
})();
