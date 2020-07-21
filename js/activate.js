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

  var fistActivation = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.pins.renderPins();

      window.data.mapPinMain.removeEventListener('mousedown', fistActivation);
      window.data.mapPinMain.removeEventListener('keydown', fistActivation);
    }
  };

  // Variables
  var fieldsets = document.querySelectorAll('fieldset');

  window.activate = {
    setMinPrice: setMinPrice
  };

  // Code
  fieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });

  typeAddress(window.data.ads[0]);
  setMinPrice();

  // Events
  window.data.mapPinMain.addEventListener('mousedown', fistActivation);
  window.data.mapPinMain.addEventListener('keydown', fistActivation);
})();
