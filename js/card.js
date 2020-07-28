'use strict';

(function () {
  //  Functions
  var showPopupFeats = function (arrayElement, popupFeaturesEllement) {
    arrayElement.offer.features.forEach(function (featureElement) {
      window.data.ARRAT_FEATURES.forEach(function (featureConstElement, index) {
        if (featureConstElement.includes(featureElement)) {
          popupFeaturesEllement[index].classList.remove('popup__feature--hiden');
        }
      });
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
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '\u20bd' + '<span>/ночь</span>';
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
    mapFilterFragment.appendChild(renderCard(window.data.filteredAds[index]));
    mapFiltersElement.appendChild(mapFilterFragment);

    var popup = document.querySelector('.popup');
    var setupClose = popup.querySelector('.popup__close');
    var popupFeatures = document.querySelectorAll('.popup__feature');

    showPopupFeats(window.data.filteredAds[index], popupFeatures);

    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', closePopupClick);
  };

  // Variables
  var mapFilterFragment = document.createDocumentFragment();
  var mapFiltersElement = window.data.map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = cardTemplate.querySelector('.popup__photo');

  window.card = {
    openPopupCard: openPopupCard,
    closePopupCard: closePopupCard
  };
})();
