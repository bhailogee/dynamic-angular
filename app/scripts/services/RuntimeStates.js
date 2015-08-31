(function (angular) {

    angular.module('app')
    .provider('RuntimeStates', ['$stateProvider','$logProvider',function RuntimeStates($stateProvider,log) {
        this.$get = function () {
            return {
                addState: function (name, state) {
                    try {
                        $stateProvider.state(name, state);
                    }
                    catch (exp) {
                        var t = exp.toString().indexOf("already defined");
                        if (t < 0) {
                            log.error(exp.toString());
                        }
                    }
                }
            }
        }
    }]);

})(window.angular);