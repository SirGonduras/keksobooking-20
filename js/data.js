'use strict';

(function () {
  //  Consants
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

  window.data = {
    ADDRESS_X: ADDRESS_X,
    ADDRESS_Y: ADDRESS_Y,
    MIN_LENGTH_TITLE: MIN_LENGTH_TITLE,
    MAX_LENGTH_TITLE: MAX_LENGTH_TITLE,
    MAX_PRICE: MAX_PRICE,
    MIN_BUNGALOW_PRICE: MIN_BUNGALOW_PRICE,
    MIN_FLAT_PRICE: MIN_FLAT_PRICE,
    MIN_HOUSE_PRICE: MIN_HOUSE_PRICE,
    MIN_PALACE_PRICE: MIN_PALACE_PRICE
  };

  //  Functions
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

  // Variables
  var map = document.querySelector('.map');
  var mapDomRect = map.getBoundingClientRect();
  var ads = [];

  // Code
  for (var i = 0; i < AD_NUMBER; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Милая, уютная квартирка в центре Токио',
        address: ADDRESS_X + ', ' + ADDRESS_Y,
        type: ARRAY_TYPE_HOUSING[window.main.getRandomNumber(0, ARRAY_TYPE_HOUSING.length)],
        price: 0,
        rooms: '3',
        guests: '3',
        checkin: ARRAY_TIME[window.main.getRandomNumber(0, ARRAY_TIME.length)],
        checkout: ARRAY_TIME[window.main.getRandomNumber(0, ARRAY_TIME.length)],
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Токио вас ждет',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
      },

      location: {
        x: window.main.getRandomNumber(0, mapDomRect.width),
        y: window.main.getRandomNumber(130, 630)
      }
    };

    ad.offer.price = window.main.getRandomNumber(getMinPrice(ad.offer.type), 11000);
    ads.push(ad);
  }
})();