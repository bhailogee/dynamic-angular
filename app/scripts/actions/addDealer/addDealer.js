
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addDealerDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addDealer.js', 'addDealer.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddDealer = function () {

						if (!$scope.DealerName) {
							notify.warn("DealerName cannot be empty.");
							return;
						}

						DataService.TX_AddDealer($scope.DealerName)

							.then(function (response) {
								if (response.v_ReturnCode == "0") {
									def.resolve(response);
									return;
								}
//                                def.resolve(response);
							return;
						});
					}
				}
			};
		}]);
})(window.angular);