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
    deactivatePage();
    window.form.setMinPrice();
    window.form.setCapacity(window.data.ads[0].offer.rooms);
    window.form.setRooms(window.data.ads[0].offer.rooms);
    window.filter.onMapFiltersChange();
  };

  var onLoadError = function (errorMessage) {
    window.form.openErrorPopup(errorMessage);
  };

  var typeAddress = function (item) {
    window.data.addressInput.value = item.location.x + ', ' + item.location.y;
  };

  var deactivatePage = function () {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    // hi
    window.data.mapPinMain.style.left = START_POSITION_PIN_MAIN_X;
    window.data.mapPinMain.style.top = START_POSITION_PIN_MAIN_Y;
    window.form.adForm.reset();
    window.form.adForm.setAttribute('disabled', 'true');
    window.pins.removePins();
    typeAddress(window.data.ads[0]);
    window.data.map.classList.add('map--faded');
    window.data.form.classList.add('ad-form--disabled');
    mapFiltersContainer.setAttribute('disabled', 'true');
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.filter.startFiltration();
    }
  };

  var onMapPinMainMousedown = function (evt) {
    if (evt.button === LEFT_BUTTON) {
      activatePage();
      window.filter.startFiltration();
    }
  };

  var activatePage = function () {
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.form.adForm.removeAttribute('disabled');
    mapFiltersContainer.removeAttribute('disabled');
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
    window.filter.onMapFiltersChange();
  };

  // Variables
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Code
  window.backend.load(onLoadSuccess, onLoadError);

  window.activate = {
    deactivatePage: deactivatePage
  };

  // Events
  window.data.mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  window.data.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
})();
