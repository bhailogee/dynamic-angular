(function (angular) {

    angular.module('app')
        .service('UserConfigurationService', ['appConfig',  function (appConfig) {

            this.settings={};



            this.getUserConfigurations = function () {                
                //angular.element.get("schema/userConfiguration.json").done(function (result) {
                //    this.settings = result;
                //});
                //ds.GetConfiguration().then(function () {
                //});
            }

        }]);
})(window.angular);