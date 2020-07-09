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
      photos: 'Tetx Array'
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
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

ads.forEach(function (item) {
  fragment.appendChild(renderPin(item));
});

mapPinsElement.appendChild(fragment);
