(function (angular) {

    angular.module('app')
        .service('Session', ['$localStorage', function (storage) {
            var sessionsKeyPrefix = "session__";
            var urlKeyPrefix = "urlparams__";

            this.set = function (key, value) {
                this._set(sessionsKeyPrefix + key,value);
            }

            this.get = function (key) {
                return this._get(sessionsKeyPrefix + key);
            }
            this.clear = function () {
                this._clear(sessionsKeyPrefix);
            },
            this.setUrlParams = function (key, value) {
                this._set(urlKeyPrefix + key, value);
            },
            this.getUrlParams = function (key) {
                return this._get(urlKeyPrefix + key);
            },
            this.clearUrlParams = function () {
                this._clear(urlKeyPrefix);
            },
            this._set = function (key, value) {
                storage[key] = value;
            }

            this._get = function (key) {
                if (key) {
                    return storage[key];
                }
                return null;
            }
            this._clear = function (keyprefix) {

                var x = 0;
                var toBRemoved = [];
                for (key in storage) {

                    if (key.startsWith(keyprefix)) {
                        toBRemoved.push(key);
                    }
                }
                for (var i = 0; i < toBRemoved.length; i++) {
                    delete storage[toBRemoved[i]];
                }
            }
        }]);
})(window.angular);
