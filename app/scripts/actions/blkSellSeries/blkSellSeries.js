
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("blkSellSeriesDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('blkSellSeries.js', 'blkSellSeries.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnblkSellSeries = function () {

						if (!$scope.PrepaidCardSeriesID) {
							notify.warn("PrepaidCardSeriesID cannot be empty.");
							return;
						}

						if (!$scope.DealerID) {
							notify.warn("DealerID cannot be empty.");
							return;
						}

						if (!$scope.DealerCardSaleID) {
							notify.warn("DealerCardSaleID cannot be empty.");
							return;
						}

						DataService.TX_BlkSellSeries($scope.PrepaidCardSeriesID, $scope.DealerID, $scope.DealerCardSaleID)

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