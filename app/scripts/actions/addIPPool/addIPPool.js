
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addIPPoolDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addIPPool.js', 'addIPPool.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddIPPool = function () {

						if (!$scope.IPPoolName) {
							notify.warn("IPPoolName cannot be empty.");
							return;
						}

						if (!$scope.IPVersion) {
							notify.warn("IPVersion cannot be empty.");
							return;
						}

						if (!$scope.StartingIP) {
							notify.warn("StartingIP cannot be empty.");
							return;
						}

						if (!$scope.EndingIP) {
							notify.warn("EndingIP cannot be empty.");
							return;
						}

						DataService.TX_AddIPPool($scope.IPPoolName, $scope.IPVersion, $scope.StartingIP, $scope.EndingIP)

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