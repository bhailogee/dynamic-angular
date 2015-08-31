
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("createAgentDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('createAgent.js', 'createAgent.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fncreateAgent = function () {

						if (!$scope.AgentName) {
							notify.warn("AgentName cannot be empty.");
							return;
						}

						if (!$scope.CurrencyID) {
							notify.warn("CurrencyID cannot be empty.");
							return;
						}

						DataService.TX_CreateAgent($scope.AgentName, $scope.CurrencyID)

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