(function (angular) {
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('app')
    .directive('deletepanelDirective', ['DataService', '$state', 'SchemaService', function (ds, state, SchemaService) {
        var seedProc = '';
        return {
            templateUrl: currentScriptPath.replace('.js', '.html'),
            controller: function ($scope, $location) {
                
                $scope.updatePrevious = function () {
                    $scope.dashboard.refreshDashboard();
                }

                $scope.delete = function () {
                    var _ss=SchemaService;
                    ds[$scope.deleteProcName]().then(function (result) {
                        //$scope.updatePrevious();
                        $scope.$parent.openEditPanel = false;
                        if($scope.dashboard && $scope.dashboard.dashboardname)
                        {
                            var relation = SchemaService.getDashboardLinkByChild($scope.dashboard.dashboardname);
                            if(relation)
                            {
                                state.go(relation.parent);
                            }
                        }
                        
                    });
                    
                }
            },
            scope: {
                viewObject: "=",    // Priority 1
                viewName: "@",      // Priority 2                
                deleteProcName:"@",
                showasmodal: "@",                
                dashboard: "="
            }
            
        };

    }])    

})(window.angular);