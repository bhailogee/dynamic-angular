
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addChargesDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addCharges.js', 'addCharges.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddCharges = function () {

						if (!$scope.Charges) {
							notify.warn("Charges cannot be empty.");
							return;
						}

						if (!$scope.AccountID) {
							notify.warn("AccountID cannot be empty.");
							return;
						}

						if (!$scope.ChargeHeadID) {
							notify.warn("ChargeHeadID cannot be empty.");
							return;
						}

						if (!$scope.AccNoPBCInstanceID) {
							notify.warn("AccNoPBCInstanceID cannot be empty.");
							return;
						}

						if (!$scope.SubscriptionID) {
							notify.warn("SubscriptionID cannot be empty.");
							return;
						}

						if (!$scope.ChargeCount) {
							notify.warn("ChargeCount cannot be empty.");
							return;
						}

						DataService.TX_AddCharges($scope.Charges, $scope.AccountID, $scope.ChargeHeadID, $scope.AccNoPBCInstanceID, $scope.SubscriptionID, $scope.ChargeCount)

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