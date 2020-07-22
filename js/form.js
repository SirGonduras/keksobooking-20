'use strict';

(function () {
  // Functions
  var setMinPrice = function () {
    switch (window.data.homeTypeSelect.value) {
      case housingType.BUNGALO:
        window.data.priceInput.min = window.data.MIN_BUNGALOW_PRICE;
        window.data.priceInput.placeholder = window.data.MIN_BUNGALOW_PRICE;
        break;
      case housingType.FLAT:
        window.data.priceInput.min = window.data.MIN_FLAT_PRICE;
        window.data.priceInput.placeholder = window.data.MIN_FLAT_PRICE;
        break;

      case housingType.HOUSE:
        window.data.priceInput.min = window.data.MIN_HOUSE_PRICE;
        window.data.priceInput.placeholder = window.data.MIN_HOUSE_PRICE;
        break;

      case housingType.PALACE:
        window.data.priceInput.min = window.data.MIN_PALACE_PRICE;
        window.data.priceInput.placeholder = window.data.MIN_PALACE_PRICE;
        break;
    }
  };

  // Variables
  var housingType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  window.form = {
    setMinPrice: setMinPrice
  };

  var timeInputFieldset = window.data.form.querySelector('.ad-form__element--time');

  var timeInSelect = timeInputFieldset.querySelector('.timein');
  var timeOutSelect = timeInputFieldset.querySelector('.timeout');

  // Events
  window.data.titleInput.addEventListener('input', function () {
    var valueLength = window.data.titleInput.value.length;

    if (valueLength < window.data.MIN_LENGTH_TITLE) {
      window.data.titleInput.setCustomValidity('Ещё ' + (window.data.MIN_LENGTH_TITLE - valueLength) + ' симв.');
    } else if (valueLength > window.data.MAX_LENGTH_TITLE) {
      window.data.titleInput.setCustomValidity('Удалите лишние ' + (valueLength - window.data.MAX_LENGTH_TITLE) + ' симв.');
    } else {
      window.data.titleInput.setCustomValidity('');
    }
  });

  window.data.homeTypeSelect.addEventListener('change', function () {
    setMinPrice();
  });

  window.data.priceInput.addEventListener('invalid', function () {
    if (window.data.priceInput.validity.valueMissing) {
      window.data.priceInput.setCustomValidity('Обязательное поле');
    } else {
      window.data.priceInput.setCustomValidity('');
    }
  });

  window.data.priceInput.addEventListener('input', function () {
    var priceValue = window.data.priceInput.value;

    if (priceValue > window.data.MAX_PRICE) {
      window.data.priceInput.setCustomValidity('Цена не может превышать ' + window.data.MAX_PRICE);
    } else if (window.data.homeTypeSelect.value === 'bungalo' && priceValue < window.data.MIN_BUNGALOW_PRICE) {
      window.data.priceInput.setCustomValidity('Цена не может быть меньше ' + window.data.MIN_BUNGALOW_PRICE);
    } else if (window.data.homeTypeSelect.value === 'flat' && priceValue < window.data.MIN_FLAT_PRICE) {
      window.data.priceInput.setCustomValidity('Цена не может быть меньше ' + window.data.MIN_FLAT_PRICE);
    } else if (window.data.homeTypeSelect.value === 'house' && priceValue < window.data.MIN_HOUSE_PRICE) {
      window.data.priceInput.setCustomValidity('Цена не может быть меньше ' + window.data.MIN_HOUSE_PRICE);
    } else if (window.data.homeTypeSelect.value === 'palace' && priceValue < window.data.MIN_PALACE_PRICE) {
      window.data.priceInput.setCustomValidity('Цена не может быть меньше ' + window.data.MIN_PALACE_PRICE);
    } else {
      window.data.priceInput.setCustomValidity('');
    }
  });

  timeInputFieldset.addEventListener('change', function (evt) {
    if (evt.target.matches('select')) {
      var indexSelect = evt.target.selectedIndex;

      timeInSelect.selectedIndex = indexSelect;
      timeOutSelect.selectedIndex = indexSelect;
    }
  });
})();
