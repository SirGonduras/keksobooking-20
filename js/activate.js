'use strict';

(function () {
  //  Functions
  var typeAddress = function (item) {
    window.data.addressInput.value = item.location.x + ', ' + item.location.y;
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
  window.form.setMinPrice();

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
