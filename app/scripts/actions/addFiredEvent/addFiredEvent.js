
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addFiredEventDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addFiredEvent.js', 'addFiredEvent.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddFiredEvent = function () {

						if (!$scope.EventHandlerID) {
							notify.warn("EventHandlerID cannot be empty.");
							return;
						}

						if (!$scope.EventTypeID) {
							notify.warn("EventTypeID cannot be empty.");
							return;
						}

						if (!$scope.PrimaryKeyValue) {
							notify.warn("PrimaryKeyValue cannot be empty.");
							return;
						}

						if (!$scope.FiredEventData) {
							notify.warn("FiredEventData cannot be empty.");
							return;
						}

						DataService.TX_AddFiredEvent($scope.EventHandlerID, $scope.EventTypeID, $scope.PrimaryKeyValue, $scope.FiredEventData)

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