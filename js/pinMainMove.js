'use strict';

(function () {
  var OFFSET_X = 32;
  var OFFSET_Y = 84;

  var cardsLimit = {
    X: {
      MIN: -32,
      MAX: 1167
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var mapPinaMainMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var moveX = window.data.mapPinMain.offsetLeft - shift.x;
      var moveY = window.data.mapPinMain.offsetTop - shift.y;

      if (moveX < cardsLimit.X.MIN) {
        moveX = cardsLimit.X.MIN;
      } else if (moveX > cardsLimit.X.MAX) {
        moveX = cardsLimit.X.MAX;
      }

      if (moveY < cardsLimit.Y.MIN) {
        moveY = cardsLimit.Y.MIN;
      } else if (moveY > cardsLimit.Y.MAX) {
        moveY = cardsLimit.Y.MAX;
      }

      window.data.mapPinMain.style.left = moveX + 'px';
      window.data.mapPinMain.style.top = moveY + 'px';

      window.writeArdress.typePinAdress(moveX + OFFSET_X, moveY + OFFSET_Y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.data.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.data.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.data.mapPinMain.addEventListener('mousedown', mapPinaMainMousedown);
})();
