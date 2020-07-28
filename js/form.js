'use strict';

(function () {
  // Functions
  var onTimeInputFieldsetChange = function (evt) {
    if (evt.target.matches('select')) {
      var indexSelect = evt.target.selectedIndex;

      timeInSelect.selectedIndex = indexSelect;
      timeOutSelect.selectedIndex = indexSelect;
    }
  };

  var onPriceInputInput = function () {
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
  };

  var onTitleInputInput = function () {
    var valueLength = window.data.titleInput.value.length;

    if (valueLength < window.data.MIN_LENGTH_TITLE) {
      window.data.titleInput.setCustomValidity('Ещё ' + (window.data.MIN_LENGTH_TITLE - valueLength) + ' симв.');
    } else if (valueLength > window.data.MAX_LENGTH_TITLE) {
      window.data.titleInput.setCustomValidity('Удалите лишние ' + (valueLength - window.data.MAX_LENGTH_TITLE) + ' симв.');
    } else {
      window.data.titleInput.setCustomValidity('');
    }
  };

  var onHomeTypeSelectChange = function () {
    setMinPrice();
  };

  var onPriceInputInvalid = function () {
    if (window.data.priceInput.validity.valueMissing) {
      window.data.priceInput.setCustomValidity('Обязательное поле');
    } else {
      window.data.priceInput.setCustomValidity('');
    }
  };

  var setRooms = function (roomsNumber) {
    switch (roomsNumber) {
      case numberOfRooms.oneRoom:
        roomNumberSelect.selectedIndex = 0;
        break;
      case numberOfRooms.twoRooms:
        roomNumberSelect.selectedIndex = 1;
        break;
      case numberOfRooms.threeRooms:
        roomNumberSelect.selectedIndex = 2;
        break;
      case numberOfRooms.hundredRooms:
        roomNumberSelect.selectedIndex = 3;
        break;
    }
  };

  var disableCapacity = function (roomsNumber) {
    var capacityOptions = capacitySelect.querySelectorAll('option');

    capacityOptions.forEach(function (item) {
      item.disabled = true;
    });

    switch (roomsNumber) {
      case numberOfRooms.threeRooms:
        capacityOptions[0].disabled = false;
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        break;
      case numberOfRooms.twoRooms:
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        break;
      case numberOfRooms.oneRoom:
        capacityOptions[2].disabled = false;
        break;
      case numberOfRooms.hundredRooms:
        capacityOptions[3].disabled = false;
        break;
    }
  };

  var setCapacity = function (roomsNumber) {
    switch (roomsNumber) {
      case numberOfRooms.threeRooms:
        capacitySelect.selectedIndex = capacityType.threeGuests;
        break;
      case numberOfRooms.twoRooms:
        capacitySelect.selectedIndex = capacityType.twoGuests;
        break;
      case numberOfRooms.oneRoom:
        capacitySelect.selectedIndex = capacityType.oneGuest;
        break;
      case numberOfRooms.hundredRooms:
        capacitySelect.selectedIndex = capacityType.notForGuests;
        break;
    }
    disableCapacity(roomsNumber);
  };

  var onRoomNumberSelectChange = function (evt) {
    setCapacity(parseInt(evt.target.value, 10));
  };

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

  var onSubmitSuccess = function () {
    openSuccessPopup();
    window.activate.deactivatePage();
  };

  var onSubmitError = function (errorMessage) {
    openErrorPopup(errorMessage);
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  };

  var renderSuccessPopup = function () {
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);
  };

  var onSuccessDivKeydown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessPopup();
    }
  };

  var onSuccessDivClick = function (evt) {
    evt.preventDefault();
    if (evt.target !== window.successMassege) {
      closeSuccessPopup();
    }
  };

  var closeSuccessPopup = function () {
    document.removeEventListener('keydown', onSuccessDivKeydown);
    document.removeEventListener('click', onSuccessDivClick);
    window.successDiv.remove();
  };

  var openSuccessPopup = function () {
    renderSuccessPopup();

    window.successDiv = document.querySelector('.success');
    window.successMassege = window.successDiv.querySelector('.success__message');

    document.addEventListener('keydown', onSuccessDivKeydown);
    document.addEventListener('click', onSuccessDivClick);
  };

  var renderErrorPopup = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').innerText = errorMessage;
    main.appendChild(errorElement);
  };

  var onErrorDocumentKeydown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorPopup();
    }
  };

  var onErrorDocumentClick = function (evt) {
    evt.preventDefault();
    if (evt.target !== window.errorMessage) {
      closeErrorPopup();
    }
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    closeErrorPopup();
  };

  var closeErrorPopup = function () {
    window.errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorDocumentKeydown);
    document.removeEventListener('click', onErrorDocumentClick);
    window.errorDiv.remove();
  };

  var openErrorPopup = function (errorMessage) {
    renderErrorPopup(errorMessage);

    window.errorDiv = document.querySelector('.error');
    window.errorButton = window.errorDiv.querySelector('.error__button');
    window.errorMessage = window.errorDiv.querySelector('.error__message');

    window.errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorDocumentKeydown);
    document.addEventListener('click', onErrorDocumentClick);
  };

  var onAdFormResetClick = function () {
    window.activate.deactivatePage();
  };

  // Variables
  var housingType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var capacityType = {
    threeGuests: 0,
    twoGuests: 1,
    oneGuest: 2,
    notForGuests: 3
  };

  var numberOfRooms = {
    oneRoom: 1,
    twoRooms: 2,
    threeRooms: 3,
    hundredRooms: 100
  };

  var main = document.querySelector('main');
  var timeInputFieldset = window.data.form.querySelector('.ad-form__element--time');

  var adForm = document.querySelector('.ad-form');
  var timeInSelect = timeInputFieldset.querySelector('.timein');
  var timeOutSelect = timeInputFieldset.querySelector('.timeout');
  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adFormReset = document.querySelector('.ad-form__reset');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.form = {
    adForm: adForm,
    setMinPrice: setMinPrice,
    setCapacity: setCapacity,
    setRooms: setRooms,
    adFormSubmit: adFormSubmit,
    onAdFormSubmit: onAdFormSubmit,
    openErrorPopup: openErrorPopup
  };

  // Events
  adFormReset.addEventListener('click', onAdFormResetClick);
  adForm.addEventListener('submit', onAdFormSubmit);
  window.data.titleInput.addEventListener('input', onTitleInputInput);
  window.data.homeTypeSelect.addEventListener('change', onHomeTypeSelectChange);
  window.data.priceInput.addEventListener('invalid', onPriceInputInvalid);
  window.data.priceInput.addEventListener('input', onPriceInputInput);
  timeInputFieldset.addEventListener('change', onTimeInputFieldsetChange);
  roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
})();
