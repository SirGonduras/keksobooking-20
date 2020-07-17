'use strict';

var AD_NUMBER = 8;
var ADDRESS_X = 600;
var ADDRESS_Y = 350;
var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;
var MAX_PRICE = 1000000;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var imgElement = pinElement.querySelector('img');

  pinElement.style.left = (pin.location.x - 25) + 'px';
  pinElement.style.top = (pin.location.y - 70) + 'px';
  imgElement.src = pin.author.avatar;
  imgElement.alt = pin.offer.title;

  return pinElement;
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
};

var typeAddress = function (item) {
  addressInput.value = item.location.x + ', ' + item.location.y;
};

var ads = [];
var map = document.querySelector('.map');
var mapDomRect = map.getBoundingClientRect();

for (var i = 0; i < AD_NUMBER; i++) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: 'text',
      address: ADDRESS_X + ', ' + ADDRESS_Y,
      price: 'int',
      type: 'palace, flat, house или bungalo',
      rooms: 'int',
      guests: 'int',
      checkin: '12:00, 13:00 или 14:00',
      checkout: '12:00, 13:00 или 14:00',
      features: '"wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"',
      description: 'text',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
    },

    location: {
      x: getRandomNumber(0, mapDomRect.width),
      y: getRandomNumber(130, 630)
    }
  };

  ads.push(ad);
}

var mapPinMain = document.querySelector('.map__pin--main');
var mapPinsElement = map.querySelector('.map__pins');
var mapFiltersElement = map.querySelector('.map__filters-container');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = cardTemplate.querySelector('.popup__photo');

var mapPinFragment = document.createDocumentFragment();
var mapFilterFragment = document.createDocumentFragment();

var fieldsets = document.querySelectorAll('fieldset');

var form = document.querySelector('.ad-form');
var addressInput = form.querySelector('#address');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    typeAddress(ads[0]);
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

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле hi');
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function () {
  var priceValue = priceInput.value;
  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity('Цена не может превышать ' + MAX_PRICE);
  } else {
    priceInput.setCustomValidity('');
  }
});

fieldsets.forEach(function (item) {
  item.setAttribute('disabled', 'true');
});

typeAddress(ads[0]);
// ads.forEach(function (item) {
//   mapPinFragment.appendChild(renderPin(item));
// });

// mapFilterFragment.appendChild(renderCard(ads[0]));

mapPinsElement.appendChild(mapPinFragment);
mapFiltersElement.appendChild(mapFilterFragment);
