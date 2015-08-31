(function (angular) {
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('app')
    .directive('listpanelDirective', ['ModelHolderService', 'Utility', 'SchemaService', 'ModelsService', 'DataService', 'appConfig', 'listHelperService', function (ModelHolderService, utility, SchemaService, ModelsService, ds, appConfig, listHelperService) {


        return {
            templateUrl: currentScriptPath.replace('listpanel.js', 'listpanel.html'),
            controller: function ($scope, $location) {
                $scope.listpanel = {};
                $scope.SchemaService = SchemaService;
                $scope.Utility = utility;

                if (!$scope.viewObject) {
                    if ($scope.viewName) {
                        $scope.viewObject = SchemaService.getViewObjectDotNotation($scope.viewName);
                    }
                }
                $scope.refreshPanel = function () {
                    ds[$scope.viewObject.apiName]().then(function (n) {
                        $scope.listpanel.gridOpts = {};
                        $scope.listpanel.gridOpts.data = n.rows;
                        angular.extend($scope.listpanel.gridOpts, $scope.viewObject.gridOptions);

                        $scope.listpanel.gridOpts.enableFiltering = true;
                        $scope.listpanel.gridOpts.enableGridMenu =  true;
                        var pdfo = {
                            enableSelectAll: true,
                            exporterPdfDefaultStyle: { fontSize: 9 },
                            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
                            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
                            exporterPdfFooter: function (currentPage, pageCount) {
                                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                            },
                            exporterPdfCustomFormatter: function (docDefinition) {
                                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                                return docDefinition;
                            },
                            exporterPdfOrientation: 'landscape',
                            exporterPdfPageSize: 'LETTER',
                            exporterPdfMaxGridWidth: 500
                        }
                        angular.extend($scope.listpanel.gridOpts, pdfo);



                        angular.forEach($scope.listpanel.gridOpts.columnDefs, function (a, b) {

                            if (a.width && a.width.toString().toLowerCase() == "auto") {
                                a.width = a.name.length * 12 || 50;
                            }                            

                            a.field = a.name;
                            a.displayName = utility.adjustText(a.name);
                           
                            
                            // This if is used for deleting purpose, 
                            // Once a user clicks delete button present in Details Panel, 
                            // It will redirect to this dashboard by using Dashboard link created in this logic.
                            if (a.cellTemplate) {
                                var startIndex = a.cellTemplate.indexOf("html#/");
                                var endIndex=a.cellTemplate.indexOf("?");
                                if (startIndex!= -1 && endIndex!=-1 && endIndex>startIndex) {
                                    SchemaService.addDashboardLink($scope.dashboard.dashboardname, a.cellTemplate.substring(a.cellTemplate.indexOf("html#/") + 6, a.cellTemplate.indexOf("?"))); 
                                }
                            }
                            ///////////////////////////////////////////////////////////////
                            
                            if (a.displayName.indexOf('V_') == 0) {
                                a.displayName = a.displayName.replace('V_', '');
                                a.displayName = a.displayName.trim();
                            }
                            listHelperService.addAlignmentClass(a);
                            listHelperService.addHeaderWrap(a);
                            listHelperService.addHeaderAlignmentClass(a);
                            
                        })
                        listHelperService.maskData($scope.listpanel.gridOpts);
                    });
                }
                $scope.refreshPanel();
                $scope.dashboard.childPanels.push($scope.refreshPanel);

            },
            scope: {
                viewObject: "=",    // Priority 1
                viewName: "@",      // Priority 2
                //updateProcName: "@", // Priority 3
                //showasmodal: "@",
                dashboard: "=",
                data:"="
            }            
        }
    }])
    .service('listHelperService',['Utility','MaskingService', function (utility,MaskingService) {

        this.addAlignmentClass = function (columnObj) {
            columnObj.cellClass = columnObj.cellClass || '';
            switch (columnObj && columnObj.colTextAlign) {
                case "left":
                case "right":
                case "center":
                case "justify":
                    columnObj.cellClass += " text-" + columnObj.colTextAlign;
                    break;
            }
        }

        this.addHeaderAlignmentClass = function (columnObj) {
            columnObj.headerCellClass = columnObj.headerCellClass || '';
            switch (columnObj && columnObj.headerTextAlign) {
                case "left":
                case "right":
                case "center":
                case "justify":
                    columnObj.headerCellClass += " text-" + columnObj.headerTextAlign;
                    break;
            }
        }

        this.addHeaderWrap = function (columnObj) {

            columnObj.headerCellClass = columnObj.headerCellClass || '';
            if (!columnObj.nowrap) {
                columnObj.headerCellClass += ' wrapGridHeading';
            }
        }

        this.maskData = function (grid) {
            angular.forEach(grid.columnDefs, function (a, b) {
                angular.forEach(grid.data, function (aData, bData) {

                    var mask = utility.getMask(a);
                    if(mask)
                    {
                        aData[a.name] = MaskingService.maskedOutput(aData[a.name], mask);
                    }
                });
            });
        }
    }]);
})(window.angular);
    