
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
	.directive("headerBannerDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) 
	{
		return {

			templateUrl: currentScriptPath.replace('headerBanner.js', 'headerBanner.html'),

			controller: function ($scope, $location, DataService) {


			}
	};
}]);
})(window.angular);