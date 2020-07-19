'use strict';

var ARRAY_TYPE_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var ARRAY_TIME = [' 12:00', '13:00', '14:00'];

var AD_NUMBER = 8;
var ADDRESS_X = 600;
var ADDRESS_Y = 350;
var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;
var MAX_PRICE = 1000000;
var MIN_BUNGALOW_PRICE = 0;
var MIN_FLAT_PRICE = 1000;
var MIN_HOUSE_PRICE = 5000;
var MIN_PALACE_PRICE = 10000;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var renderPin = function (pin, index) {
  var pinElement = pinTemplate.cloneNode(true);
  var imgElement = pinElement.querySelector('img');

  var mapPinCalssName = 'map__pin--' + index;

  pinElement.classList.add(mapPinCalssName);
  pinElement.tabindex = 0;
  pinElement.style.left = (pin.location.x - 25) + 'px';
  pinElement.style.top = (pin.location.y - 70) + 'px';
  imgElement.src = pin.author.avatar;
  imgElement.alt = pin.offer.title;

  return pinElement;
};

var getPinNumber = function (pin) {
  var pinNumber;
  pin.classList.forEach(function (item) {
    pinNumber = item.match(/\d+/);
  });
  return parseInt(pinNumber, 10);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopupCard();
  }
};

var closePopupClick = function () {
  closePopupCard();
};

var closePopupCard = function () {
  var popup = document.querySelector('.popup');
  var setupClose = popup.querySelector('.popup__close');

  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', closePopupClick);

  popup.remove();
};

var openPopupCard = function (index) {
  var popupBool = document.querySelector('.popup');

  if (popupBool) {
    closePopupCard();
  }

  mapFilterFragment.appendChild(renderCard(ads[index]));
  mapFiltersElement.appendChild(mapFilterFragment);

  var popup = document.querySelector('.popup');
  var setupClose = popup.querySelector('.popup__close');

  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('click', closePopupClick);
};

var renderPins = function () {
  ads.forEach(function (item, index) {
    mapPinFragment.appendChild(renderPin(item, index));
  });

  mapPins.appendChild(mapPinFragment);

  mapPins.addEventListener('click', function (evt) {
    var pinButton = evt.target.closest('button');

    if (pinButton && !pinButton.classList.contains('map__pin--main')
        && pinButton.classList.contains('map__pin')) {
      getPinNumber(pinButton);
      openPopupCard(getPinNumber(pinButton));
    }
  });
};

var createPhotosElements = function (card, arrayElement) {
  var photosFragment = document.createDocumentFragment();
  var popupPhotoItem = popupPhoto.cloneNode(true);

  popupPhotoItem.src = arrayElement;
  photosFragment.appendChild(popupPhotoItem);

  return photosFragment;
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var photosDiv = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');

  cardElement.querySelector('.popup__title').innerText = card.offer.title;
  cardElement.querySelector('.popup__text--address').innerText = card.offer.address;
  cardElement.querySelector('.popup__text--price').innerText = card.offer.price;
  cardElement.querySelector('.popup__type').innerText = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').innerText = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerText = card.offer.features;
  cardElement.querySelector('.popup__description').innerText = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  photosDiv.removeChild(photo);

  card.offer.photos.forEach(function (item) {
    photosDiv.appendChild(createPhotosElements(card, item));
  });

  return cardElement;
};

var activatePage = function () {
  fieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
};

var typeAddress = function (item) {
  addressInput.value = item.location.x + ', ' + item.location.y;
};

var setMinPrice = function () {
  switch (homeTypeSelect.value) {
    case 'bungalo':
      priceInput.min = MIN_BUNGALOW_PRICE;
      break;
    case 'flat':
      priceInput.min = MIN_FLAT_PRICE;
      break;

    case 'house':
      priceInput.min = MIN_HOUSE_PRICE;
      break;

    case 'palace':
      priceInput.min = MIN_PALACE_PRICE;
      break;
  }
};

var getMinPrice = function (homeType) {
  var minPrice = 0;

  switch (homeType) {
    case 'bungalo':
      minPrice = MIN_BUNGALOW_PRICE;
      break;
    case 'flat':
      minPrice = MIN_FLAT_PRICE;
      break;

    case 'house':
      minPrice = MIN_HOUSE_PRICE;
      break;

    case 'palace':
      minPrice = MIN_PALACE_PRICE;
      break;
  }

  return minPrice;
};

var ads = [];
var map = document.querySelector('.map');
var mapDomRect = map.getBoundingClientRect();

var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = map.querySelector('.map__pins');
var mapFiltersElement = map.querySelector('.map__filters-container');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = cardTemplate.querySelector('.popup__photo');

var fieldsets = document.querySelectorAll('fieldset');

var form = document.querySelector('.ad-form');
var addressInput = form.querySelector('#address');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');
var homeTypeSelect = form.querySelector('#type');

for (var i = 0; i < AD_NUMBER; i++) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: ADDRESS_X + ', ' + ADDRESS_Y,
      type: ARRAY_TYPE_HOUSING[getRandomNumber(0, ARRAY_TYPE_HOUSING.length)],
      price: 0,
      rooms: '3',
      guests: '3',
      checkin: ARRAY_TIME[getRandomNumber(0, ARRAY_TIME.length)],
      checkout: ARRAY_TIME[getRandomNumber(0, ARRAY_TIME.length)],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Токио вас ждет',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
    },

    location: {
      x: getRandomNumber(0, mapDomRect.width),
      y: getRandomNumber(130, 630)
    }
  };

  ad.offer.price = getRandomNumber(getMinPrice(ad.offer.type), 11000);
  ads.push(ad);
}

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    typeAddress(ads[0]);
    renderPins();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;

  if (valueLength < MIN_LENGTH_TITLE) {
    titleInput.setCustomValidity('Ещё ' + (MIN_LENGTH_TITLE - valueLength) + ' симв.');
  } else if (valueLength > MAX_LENGTH_TITLE) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH_TITLE) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
});

homeTypeSelect.addEventListener('change', function () {
  setMinPrice();
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function () {
  var priceValue = priceInput.value;

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity('Цена не может превышать ' + MAX_PRICE);
  } else if (homeTypeSelect.value === 'bungalo' && priceValue < MIN_BUNGALOW_PRICE) {
    priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_BUNGALOW_PRICE);
  } else if (homeTypeSelect.value === 'flat' && priceValue < MIN_FLAT_PRICE) {
    priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_FLAT_PRICE);
  } else if (homeTypeSelect.value === 'house' && priceValue < MIN_HOUSE_PRICE) {
    priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_HOUSE_PRICE);
  } else if (homeTypeSelect.value === 'palace' && priceValue < MIN_PALACE_PRICE) {
    priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_PALACE_PRICE);
  } else {
    priceInput.setCustomValidity('');
  }
});

fieldsets.forEach(function (item) {
  item.setAttribute('disabled', 'true');
});

typeAddress(ads[0]);
setMinPrice();

var mapPinFragment = document.createDocumentFragment();
var mapFilterFragment = document.createDocumentFragment();

