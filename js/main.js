'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.main = {
    getRandomNumber: getRandomNumber
  };
})();

// (function () {
//   //  Consants

//   //  Functions

//   // Variables

//   // Code

// })();
