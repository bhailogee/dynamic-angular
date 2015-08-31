(function (angular) {
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('app')
    .directive('detailspanelDirective', ['ModelHolderService', 'Utility', 'SchemaService','ModelsService', function (ModelHolderService, utility, SchemaService,ModelsService) {
        return {
            templateUrl: currentScriptPath.replace('detailspanel.js', 'detailspanel.html'),
            controller: function ($scope, $location) {
                //$scope.columnsArray = new Array($scope.columns);
                $scope.data={};
                $scope.getKey = utility.getObjectKey;
                $scope.getValue = utility.getObjectValue;
                $scope.SchemaService = SchemaService;
                $scope.Utility = utility;

                $scope.refreshPanel = function () {
                    if ($scope.viewObject && $scope.viewObject.apiName) {
                        ModelHolderService.get($scope.viewObject.apiName, false, function (n) {
                            var mappedOutput = SchemaService.mapResults($scope.viewObject.apiName, n[0], $scope.viewObject.viewName);
                            $scope.data = mappedOutput;
                        });
                    }
                }
                $scope.refreshPanel();
                $scope.dashboard.childPanels.push($scope.refreshPanel);
            },
            scope: {
                viewObject: "=",
                dashboard: "="
            }
        };

    }]);
    

})(window.angular);