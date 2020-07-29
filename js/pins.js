
'use strict';

(function () {
  var pinOffset = {
    X: 25,
    Y: 70
  };

  //  Functions
  var getPinNumber = function (pin) {
    var pinNumber = pin.classList[1].match(/\d+/);

    return parseInt(pinNumber, 10);
  };

  var removeClassActive = function () {
    var activePin = document.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var addClassActive = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var onMapPinsClick = function (evt) {
    var pinButton = evt.target.closest('button');
    if (pinButton && !pinButton.classList.contains('map__pin--main')
        && pinButton.classList.contains('map__pin')) {
      window.card.openPopupCard(getPinNumber(pinButton));
      removeClassActive();
      addClassActive(pinButton);
    }
  };

  var renderPin = function (pin, index) {
    var pinElement = pinTemplate.cloneNode(true);
    var imgElement = pinElement.querySelector('img');

    var mapPinCalssName = 'map__pin--' + index;

    pinElement.classList.add(mapPinCalssName);
    pinElement.tabindex = 0;
    pinElement.style.left = (pin.location.x - pinOffset.X) + 'px';
    pinElement.style.top = (pin.location.y - pinOffset.Y) + 'px';
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
    removePins: removePins,
    removeClassActive: removeClassActive
  };
})();
