define(['./module'], function (systemModule) {
  'use strict';

  systemModule.factory("Global", [function () {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: !!window.user
    };

    return _this._data;
  }]);
});
