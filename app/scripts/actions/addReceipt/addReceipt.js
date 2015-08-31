
(function (angular) {

	'use strict';

	var scripts = document.getElementsByTagName("script")
	var currentScriptPath = scripts[scripts.length - 1].src;

	angular.module("app")
		.directive("addReceiptDirective",['$state','$timeout', 'DataService','notify', function (state,timeout, DataService,notify) {

			return {

				templateUrl: currentScriptPath.replace('addReceipt.js', 'addReceipt.html'),

				controller: function ($scope, $location, DataService) {

					$scope.displayPopUp = 'none';

					$scope.fnaddReceipt = function () {

						if (!$scope._ReceiptID) {
							notify.warn("_ReceiptID cannot be empty.");
							return;
						}

						if (!$scope.ABMFID) {
							notify.warn("ABMFID cannot be empty.");
							return;
						}

						if (!$scope.PrepaidCardID) {
							notify.warn("PrepaidCardID cannot be empty.");
							return;
						}

						if (!$scope.Amount) {
							notify.warn("Amount cannot be empty.");
							return;
						}

						if (!$scope.DeferredCommission) {
							notify.warn("DeferredCommission cannot be empty.");
							return;
						}

						if (!$scope.InstrumentNumber) {
							notify.warn("InstrumentNumber cannot be empty.");
							return;
						}

						if (!$scope.PaymentMode) {
							notify.warn("PaymentMode cannot be empty.");
							return;
						}

						if (!$scope.Remarks) {
							notify.warn("Remarks cannot be empty.");
							return;
						}

						if (!$scope.RemoteIP) {
							notify.warn("RemoteIP cannot be empty.");
							return;
						}

						if (!$scope.HasPaymentTaxes) {
							notify.warn("HasPaymentTaxes cannot be empty.");
							return;
						}

						if (!$scope.OpaqueData1) {
							notify.warn("OpaqueData1 cannot be empty.");
							return;
						}

						if (!$scope.OpaqueData2) {
							notify.warn("OpaqueData2 cannot be empty.");
							return;
						}

						if (!$scope.OpaqueData3) {
							notify.warn("OpaqueData3 cannot be empty.");
							return;
						}

						DataService.TX_AddReceipt($scope._ReceiptID, $scope.ABMFID, $scope.PrepaidCardID, $scope.Amount, $scope.DeferredCommission, $scope.InstrumentNumber, $scope.PaymentMode, $scope.Remarks, $scope.RemoteIP, $scope.HasPaymentTaxes, $scope.OpaqueData1, $scope.OpaqueData2, $scope.OpaqueData3)

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