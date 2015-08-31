
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addDealerSaleDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addDealerSale.js', 'addDealerSale.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddDealerSale = function () {

						if (!$scope.DealerID) {
							notify.warn("DealerID cannot be empty.");
							return;
						}

						DataService.TX_AddDealerSale($scope.DealerID)

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