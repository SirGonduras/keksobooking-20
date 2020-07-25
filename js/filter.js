'use strict';

(function () {
  var PINS_LIMIT = 5;
  var DEBOUNCE_INTERVAL = 300;

  var mapFilters = document.querySelector('.map__filters');
  var filterItems = mapFilters.querySelectorAll('select, input');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresFieldset = mapFilters.querySelector('#housing-features');

  var data = [];
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

  var filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  var onMapFiltersChange = debounce(function () {
    filteredAds = data.slice(0);
    filteredAds = filteredAds.mapFilters(filtrationByType);
    window.pins.removePins();
    window.card.closePopupCard();
    window.pins.renderPins(filteredAds.slice(0, PINS_LIMIT));
  });

  var startFiltration = function (adsArray) {
    data = window.data.ads;

    onMapFiltersChange();
    mapFilters.addEventListener('change', onMapFiltersChange);
    return adsArray.slice(0, PINS_LIMIT);
  };
})();
