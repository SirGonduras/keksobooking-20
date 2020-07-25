'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var START_POSITION_PIN_MAIN_X = '570px';
  var START_POSITION_PIN_MAIN_Y = '375px';

  //  Functions
  var onLoadSuccess = function (loadArray) {
    window.data.ads = loadArray;
    window.data.addressInput.readOnly = 'true';
    typeAddress(window.data.ads[0]);
    window.form.setMinPrice();
    window.form.setCapacity(window.data.ads[0].offer.rooms);
    window.form.setRooms(window.data.ads[0].offer.rooms);
  };

  var onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  var deactivatePage = function () {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    window.data.mapPinMain.style.left = START_POSITION_PIN_MAIN_X;
    window.data.mapPinMain.style.top = START_POSITION_PIN_MAIN_Y;

    window.form.adForm.reset();
    window.data.map.classList.add('map--faded');
    window.data.form.classList.add('ad-form--disabled');
    mapFiltersContainer.setAttribute('disabled', 'true');
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.pins.renderPins();
    }
  };

  var onMapPinMainMousedown = function (evt) {
    if (evt.button === LEFT_BUTTON) {
      activatePage();
      window.pins.renderPins();
    }
  };

  var typeAddress = function (item) {
    window.data.addressInput.value = item.location.x + ', ' + item.location.y;
  };

  var activatePage = function () {
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    typeAddress(window.data.ads[0]);
    mapFiltersContainer.removeAttribute('disabled');
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
  };

  // Variables
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Code
  deactivatePage();
  window.backend.load(onLoadSuccess, onLoadError);

  window.activate = {
    deactivatePage: deactivatePage
  };

  // Events
  window.data.mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  window.data.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
})();
