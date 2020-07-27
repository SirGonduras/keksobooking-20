'use strict';

(function () {
  var PINS_NUMBER = 5;
  var DEBOUNCE_INTERVAL = 300;

  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');

  var filteredAds = [];

  var debounce = function (cd) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cd.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var filtrationByType = function (item) {
    if (typeSelect.value.toString() === 'any') {
      return true;
    } else if (typeSelect.value === item.offer.type) {
      return true;
    } else {
      return false;
    }
  };

  var onMapFiltersChange = debounce(function () {
    filteredAds = window.data.ads.slice();
    filteredAds = filteredAds.filter(filtrationByType);
    window.pins.removePins();

    var popupBool = document.querySelector('.popup');

    if (popupBool) {
      window.card.closePopupCard();
    }
    window.pins.renderPins(filteredAds.slice(0, PINS_NUMBER));
  });

  var startFiltration = function () {
    onMapFiltersChange();
    mapFilters.addEventListener('change', onMapFiltersChange);
  };

  window.filter = {
    startFiltration: startFiltration
  };

})();
