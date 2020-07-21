'use strict';

var ARRAY_TYPE_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var ARRAY_TIME = [' 12:00', '13:00', '14:00'];
var ARRAT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var AD_NUMBER = 8;
var ADDRESS_X = 600;
var ADDRESS_Y = 350;

var MIN_BUNGALOW_PRICE = 0;
var MIN_FLAT_PRICE = 1000;
var MIN_HOUSE_PRICE = 5000;
var MIN_PALACE_PRICE = 10000;

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

var getRandomArray = function (arrayIn) {
  var arrayOut = [];
  var len = getRandomNumber(1, arrayIn.length);

  for (var i = 0; i < len; i++) {
    arrayOut[i] = ARRAT_FEATURES[i];
  }
  return arrayOut;
};

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

var showpopupFeats = function (arrayElement) {
  arrayElement.offer.features.forEach(function (featureElement) {
    ARRAT_FEATURES.forEach(function (featureConstElement, index) {
      if (featureConstElement.includes(featureElement)) {
        popupFeatures[index].classList.remove('popup__feature--hiden');
      }
    });
  });
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
  cardElement.querySelector('.popup__description').innerText = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  photosDiv.removeChild(photo);

  card.offer.photos.forEach(function (item) {
    photosDiv.appendChild(createPhotosElements(card, item));
  });

  return cardElement;
};

var map = document.querySelector('.map');
var mapDomRect = map.getBoundingClientRect();

var ads = [];

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
      features: getRandomArray(ARRAT_FEATURES),
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

map.classList.remove('map--faded');

var mapPinsElement = map.querySelector('.map__pins');
var mapFiltersElement = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = cardTemplate.querySelector('.popup__photo');

var mapPinFragment = document.createDocumentFragment();
var mapFilterFragment = document.createDocumentFragment();
ads.forEach(function (item) {
  mapPinFragment.appendChild(renderPin(item));
});

mapFilterFragment.appendChild(renderCard(ads[0]));

mapPinsElement.appendChild(mapPinFragment);
mapFiltersElement.appendChild(mapFilterFragment);

var popupFeatures = document.querySelectorAll('.popup__feature');

showpopupFeats(ads[0]);
