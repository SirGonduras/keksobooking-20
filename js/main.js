'use strict';

var AD_NUMBER = 8;
var ADDRESS_X = 600;
var ADDRESS_Y = 350;

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

var createPhotosElements = function (card) {
  var photosFragment = document.createDocumentFragment();
  var popupPhotoItem = popupPhoto.cloneNode(true);

  card.offer.photos.forEach(function (item) {
    popupPhotoItem.src = item;
    photosFragment.appendChild(popupPhotoItem);
  });

  return photosFragment;
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var photosDiv = cardElement.querySelectorAll('.popup__photos');
  var photo = cardElement.querySelectorAll('.popup__photo');

  cardElement.querySelector('.popup__title').innerText = card.offer.title;
  cardElement.querySelector('.popup__text--address').innerText = card.offer.address;
  cardElement.querySelector('.popup__text--price').innerText = card.offer.price;
  cardElement.querySelector('.popup__type').innerText = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').innerText = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerText = card.offer.features;
  cardElement.querySelector('.popup__description').innerText = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  // photosDiv.removeChild(photo);
  photosDiv.appendChild(createPhotosElements(card));

  return cardElement;
};

// var renderCardPhoto = function (addres) {
//   var cardElement = cardTemplate.cloneNode(true);
//   var imgHotelElement = cardElement.querySelector('.popup__photo');

//   imgHotelElement.src = addres;

//   return cardElement;
// };

var map = document.querySelector('.map');
var mapDomRect = map.getBoundingClientRect();

var ads = [];

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

map.classList.remove('map--faded');

var mapPinsElement = map.querySelector('.map__pins');
var mapFiltersElement = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = cardTemplate.content.querySelector('.popup__photo');

var mapPinFragment = document.createDocumentFragment();
var mapFilterFragment = document.createDocumentFragment();

ads.forEach(function (item) {
  mapPinFragment.appendChild(renderPin(item));
});

mapFilterFragment.appendChild(renderCard(ads[0]));

// // console.log(ads[0].offer.photos);
// ads[0].offer.photos.forEach(function (item) {
//   console.log(item);
//   mapFilterFragment.appendChild(renderCardPhoto(item));
// });

mapPinsElement.appendChild(mapPinFragment);
mapFiltersElement.appendChild(mapFilterFragment);
