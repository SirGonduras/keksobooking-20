'use strict';

(function () {
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

      if (moveX < -32) {
        moveX = -32;
      } else if (moveX > 1167) {
        moveX = 1167;
      }

      if (moveY < 0) {
        moveY = 0;
      } else if (moveY > 620) {
        moveY = 620;
      }

      window.data.mapPinMain.style.left = moveX + 'px';
      window.data.mapPinMain.style.top = moveY + 'px';
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
