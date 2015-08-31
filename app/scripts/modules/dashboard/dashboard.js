(function (angular) {
    
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    var app = angular.module('app')
    .directive('dashboardDirective', ['Utility', 'SchemaService', 'ModelHolderService', 'lodash', 'ModelsService','$stateParams','Session', function (utility, SchemaService, ModelHolderService, _, ModelsService,$stateParams,Session) {

        return {
            templateUrl: currentScriptPath.replace('.js', '.html'),
            controller: function ($scope, $location) {

                $scope.dashboardScope = {};
                
                $scope.dashboardScope.dashboardname = $scope.$root.currentState;
                $scope.dashboardScope.dashboard = SchemaService.getDashboard($scope.dashboardScope.dashboardname);
                
                $scope.dashboardScope.data = "";

                $scope.dashboardScope.viewObjects = SchemaService.getDashboardViewObjects($scope.dashboardScope.dashboardname);

                $scope.utility = utility;
                $scope.dashboardScope.childPanels = [];
                $scope.SchemaService = SchemaService;
                //var seedName = SchemaService.getSeedDataProc(c);
                //ModelHolderService.get(seedName,true);
                //$scope.$watch(ModelsService[seedName], function executedashboard (n, o) {
                //    var mappedOutput = SchemaService.mapResults(seedName, n);
                //    $scope.data = n;
                //})

                if($scope.dashboardScope.dashboard && $scope.dashboardScope.dashboard.params && $scope.dashboardScope.dashboard.params.length>0)
                {
                    for(p=0;p<$scope.dashboardScope.dashboard.params.length;p++)
                    {
                        Session.setUrlParams($scope.dashboardScope.dashboard.params[p],$stateParams[$scope.dashboardScope.dashboard.params[p]]);
                    }
                }

                $scope.dashboardScope.refreshDashboard = function () {
                    var seedApiName = SchemaService.getSeedDataProc($scope.dashboardScope.dashboardname);

                    if (seedApiName) {
                        //ModelHolderService.get(seedApiName, true, function (newValue) {
                        //    var mappedOutput = SchemaService.mapResults(seedApiName, newValue[0]);
                        //    $scope.dashboardScope.data = mappedOutput;
                        //});
                        for (var i = 0; i < seedApiName.split(',').length; i++) {
                            ModelHolderService.get(seedApiName.split(',')[i], true, function (newValue) { });
                        }
                    }


                    for (var i = 0; i < $scope.dashboardScope.childPanels.length; i++) {
                        $scope.dashboardScope.childPanels[i]();
                    }
                };
                $scope.dashboardScope.refreshDashboard();
            },
            scope: {
            }
            
        }


    }]);

    


})(window.angular);