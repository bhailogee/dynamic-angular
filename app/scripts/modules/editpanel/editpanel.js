(function (angular) {
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('app')
    .directive('editpanelDirective', ['DataService', 'ModelHolderService', 'SchemaService','Utility', function (ds, ModelHolderService, SchemaService,Utility) {
        var seedProc = '';
        return {            
            templateUrl: currentScriptPath.replace('editpanel.js', 'editpanel.html'),
            controller: function ($scope, $location) {
                $scope.data = "";
                $scope.SchemaService = SchemaService;                
                $scope.paneltemplate = { Title: 'Update', Button: 'Update' };
                $scope.Utility = Utility;
                
               
                //getting View Object for edit                
                if (!$scope.viewObject) {
                    if ($scope.viewName) {
                        $scope.viewObject = SchemaService.getViewObjectDotNotation($scope.viewName);
                    }
                    else if ($scope.updateProcName)
                    {
                        $scope.viewObject = SchemaService.getViewObjectDotNotation($scope.updateProcName + ".view1");
                    }
                }

                //getting Seed Proc Name for edit
                seedProc = $scope.viewObject.seedProc || $scope.viewObject.apiName;
                if($scope.$parent.viewObject && $scope.$parent.viewObject.apiName)
                {
                    seedProc = $scope.$parent.viewObject.apiName;
                }
                ModelHolderService.get(seedProc, false);
                
                $scope.submitChanges = function () {
                    ds._editChanges($scope);
                }

                $scope.discardChange = function () {
                    if ($scope.$parent.openEditPanel) {
                        $scope.$parent.openEditPanel = false;
                    }
                    $scope.resetState();
                }

                $scope.setResetState = function () {
                    $scope.resetData = angular.copy($scope.data);
                }
                $scope.resetState = function () {
                    $scope.data = angular.copy($scope.resetData);
                }
                $scope.updatePrevious = function () {
                    $scope.dashboard.refreshDashboard();  
                    $scope.resetState();
                }

                $scope.refreshPanel = function () {
                    ModelHolderService.get(seedProc, false, function (n) {
                        var mappedOutput = SchemaService.mapResults($scope.viewObject.apiName, n[0], $scope.viewObject.viewName, seedProc);
                        $scope.data = mappedOutput[0];
                        $scope.setResetState();
                    });
                };
                $scope.refreshPanel ();
                $scope.dashboard.childPanels.push($scope.refreshPanel);
            },
            scope: {
                viewObject: "=",    // Priority 1
                viewName: "@",      // Priority 2
                updateProcName: "@", // Priority 3
                showasmodal: "@",
                dashboard: "="
            }
        };

    }])
    .service('editService', ['DataService', '$q', 'AuthenticationService', function (ds, q, AuthenticationService) {

        var myresults = {};

        this.update = function (api) {
            myresults[api] = {};
            return ds[api](AuthenticationService.currentUserID()).then(function (result) {
                myresults[api] = result.rows[0];
                return myresults[api];
            });
        }
    }]);

})(window.angular);