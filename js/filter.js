'use strict';

(function () {
  var PINS_NUMBER = 5;
  var DEBOUNCE_INTERVAL = 300;
  var priceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000
    }
  };

  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    ANY: 'any'
  };

  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresFieldset = mapFilters.querySelector('#housing-features');

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

  var definePriceType = function (price) {
    if (price >= priceRange.LOW.MIN
      && price < priceRange.LOW.MAX) {
      return PriceType.LOW;
    } else if (price >= priceRange.MIDDLE.MIN
        && price < priceRange.MIDDLE.MAX) {
      return PriceType.MIDDLE;
    } else {
      return PriceType.HIGH;
    }
  };

  var filtrationByPrice = function (item) {
    var priceLelev = definePriceType(item.offer.price);
    if (priceSelect.value.toString() === PriceType.ANY) {
      return true;
    } else if (priceSelect.value.toString() === priceLelev) {
      return true;
    } else {
      return false;
    }
  };

  var filtrationByRooms = function (item) {
    if (roomsSelect.value.toString() === 'any') {
      return true;
    } else if (roomsSelect.value <= item.offer.rooms) {
      return true;
    } else {
      return false;
    }
  };

  var filtrationByGuests = function (item) {
    if (guestsSelect.value.toString() === 'any') {
      return true;
    } else if (guestsSelect.value.toString() === '0'
        && item.offer.guests === 0) {
      return true;
    } else if ((guestsSelect.value.toString() === '1'
        || guestsSelect.value.toString() === '2')
        && guestsSelect.value <= item.offer.guests) {
      return true;
    } else {
      return false;
    }
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var filtrationItem = function (item) {
    var filtratedItem = filtrationByType(item) && filtrationByPrice(item) && filtrationByRooms(item)
      && filtrationByGuests(item) && filtrationByFeatures(item);
    if (filtratedItem) {
      return true;
    } else {
      return false;
    }
  };

  var onMapFiltersChange = debounce(function () {
    window.data.filteredAds = window.data.ads.slice();
    window.data.filteredAds = window.data.filteredAds.filter(filtrationItem);
    window.pins.removePins();

    var popupBool = document.querySelector('.popup');

    if (popupBool) {
      window.card.closePopupCard();
    }

    if (!document.querySelector('.map--faded')) {
      window.pins.renderPins(window.data.filteredAds.slice(0, PINS_NUMBER));
    }

  });

  var startFiltration = function () {
    mapFilters.addEventListener('change', onMapFiltersChange);
  };

  window.filter = {
    onMapFiltersChange: onMapFiltersChange,
    startFiltration: startFiltration,
  };

})();
