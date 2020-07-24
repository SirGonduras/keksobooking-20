'use strict';
(function () {
  var ServerUrl = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data'
  };

  var MessageText = {
    ERROR_LOAD: 'Неизвестная ошибка.',
    ERROR_SERVER: 'Ошибка соединения.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает.'
  };

  var StatusCode = {
    OK: 200
  };

  var createXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(MessageText.ERROR_LOAD);
      }
    });
    xhr.addEventListener('error', function () {
      onError(MessageText.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      onError(MessageText.ERROR_TIMEOUT);
    });
    xhr.open(method, url);
    return xhr;
  };

  var load = function (onLoad, onError) {
    createXhr('GET', ServerUrl.LOAD, onLoad, onError).send();
  };

  window.backend = {
    load: load
  };
})();
