'use strict';

(function () {
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
    window.data.map.classList.add('map--faded');
    window.data.form.classList.add('ad-form--disabled');
    mapFiltersContainer.setAttribute('disabled', 'true');
    window.form.adFormSubmit.removeEventListener('submit', window.form.onAdFormSubmit);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      typeAddress(window.data.ads[0]);
      window.pins.renderPins();
    }
  };

  var onMapPinMainMousedown = function (evt) {
    if (evt.button === 0) {
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
    mapFiltersContainer.removeAttribute('disabled');
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
    window.form.adFormSubmit.addEventListener('submit', window.form.onAdFormSubmit);
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
