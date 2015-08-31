(function (angular) {
    'use strict';

    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module("loginModule", [])
        .directive("loginDirective",['$state','$timeout', function (state,timeout) {
            return {
                templateUrl: currentScriptPath.replace('login.js', 'login.html'),
                controller: function ($scope, $location, AuthenticationService) {
                    $scope.loginName = "SuperAdmin";
                    $scope.password = "admin";                   
                    $scope.fnLoginSubmit = function () {
                        if ($scope.loginName == "" || $scope.password == "") {
                            $scope.notify.warn("Login Password cannot be empty.");
                            return;
                        }
                        AuthenticationService.logIn($scope).then(function (response) {
                            if (response) {
                                state.go('main.default');
                            }
                        });
                    }
                    timeout(function () {
                        $scope.fnLoginSubmit();
                    }, 1000);
                }
            };
        }]);
})(window.angular);