(function (angular) {


    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;


    var app = angular.module('app')
        .directive('mainDirective', ['$q', 'menuService', function ($q, menuService) {
            return {
                templateUrl: currentScriptPath.replace("main.js", "main.html")                
            }
        }]);
})(window.angular);