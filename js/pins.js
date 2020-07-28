
'use strict';

(function () {
  //  Functions
  var getPinNumber = function (pin) {
    var pinNumber;
    pin.classList.forEach(function (item) {
      pinNumber = item.match(/\d+/);
    });
    return parseInt(pinNumber, 10);
  };

  var onMapPinsClick = function (evt) {
    var pinButton = evt.target.closest('button');

    if (pinButton && !pinButton.classList.contains('map__pin--main')
        && pinButton.classList.contains('map__pin')) {
      window.card.openPopupCard(getPinNumber(pinButton));
    }
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

  var removePins = function () {
    mapPins = window.data.map.querySelector('.map__pins');
    mapPins.removeEventListener('click', onMapPinsClick);
    var pins = mapPins.querySelectorAll('.map__pin');

    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  var renderPins = function (ads) {
    ads.forEach(function (item, index) {
      mapPinFragment.appendChild(renderPin(item, index));
    });

    mapPins.appendChild(mapPinFragment);
    mapPins.addEventListener('click', onMapPinsClick);
  };

  // Variables

  var mapPinFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = window.data.map.querySelector('.map__pins');

  window.pins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
