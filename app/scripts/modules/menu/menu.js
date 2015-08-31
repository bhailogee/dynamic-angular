
(function (angular) {


    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;


    var app = angular.module('app')
        .directive('menuDirective', ['$q', 'menuService', '$state', function ($q, menuService, state) {
            return {
                templateUrl: currentScriptPath.replace("menu.js", "menu.html"),
                controller: function ($scope) {

                    $scope.selectedIndex = [0, 'child'];
                },
                link: function (scope, elm, attr) {
                    var lastSelected;
                    menuService.loadModules().then(function (result) {
                        scope.menuItems = result;
                        state.go("basicdashboard");
                    });

                    scope.menuClicked = function (index, level, $event) {
                        scope.selectedIndex = [index, level];

                        if ($event) {
                            $(lastSelected).removeClass("activated");
                            $($event.target).addClass("activated");
                            lastSelected = $event.target;
                        }
                        return true;

                    }

                    $(".vertical > ul", elm).on('click', ' > li > a', function (item) {

                        var childDiv = $('> ul', this.parentNode);
                        if (childDiv.css('display') == 'none') {
                            childDiv.show(500);
                        }
                        else {
                            childDiv.hide(500);
                        }
                    });

                    $(".vertical > ul", elm).on('click', ".submenu > a", function (item) {

                        var childDiv = $('> ul', this.parentNode);
                        if (childDiv.css('display') == 'none') {
                            childDiv.show(500);
                        }
                        else {
                            childDiv.hide(500);
                        }
                    });

                  


                }
            }
        }])
    .service('menuService', ['DataService', 'AuthenticationService', 'notify', 'RuntimeStates', 'SchemaService', function (ds, auth, notify, uiStates, SchemaService) {

        this.loadModules = function () {
            return ds.DB_GetAuthorisedModules().then(function (result) {
                var doneDashboards = {};
                var rows = result.rows;
                var states = {};
                var menu = {};
                var defaultMenu = {
                    url: "/basicdashboard",
                    views: { "mainContainer": { templateUrl: "scripts/modules/dashboard/dashboardmain.html" } },
                    parent: 'main'
                };
                uiStates.addState('basicdashboard', defaultMenu);

                var dashboardsObjects = SchemaService.getDashboards();
                var idToNodeMap = {};

                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.State) {
                        var tmpState = {};
                        tmpState.url = row.Path || (row.DashboardName ? "/" + row.DashboardName : ("/" + row.State));
                        tmpState.views = {};
                        tmpState.cache = false;
                        tmpState.dashboardName = row.DashboardName || row.State;
                        var dashboardObject = dashboardsObjects[tmpState.dashboardName];
                        doneDashboards[tmpState.dashboardName] = true;
                        if (dashboardObject && dashboardObject.params && dashboardObject.params.length > 0) {
                            tmpState.url += "?";
                            var urlParams = "";
                            for (l = 0; l < dashboardObject.params.length; l++) {
                                if (dashboardObject.params[l].length > 0) {
                                    if (urlParams.length > 0) {
                                        urlParams += "&";
                                    }
                                    urlParams += dashboardObject.params[l];
                                }
                            }
                            tmpState.url += urlParams;

                        }


                        //if (tmpState.url.indexOf('portaldashboard') > 0)
                        //{
                        //    tmpState.url = "/";

                        //}
                        //tmpState.views[row.Container] = {
                        //    template: function () {

                        //    }
                        //}
                        //tmpState.views[row.Container] = { templateUrl: (row.TemplateUrl || "scripts/modules/" + row.State + "/" + row.State + ".html") };
                        tmpState.views[row.Container || 'mainContainer'] = { templateUrl: (row.TemplateUrl || "scripts/modules/dashboard/dashboardmain.html") };
                        //tmpState.templateUrl = (row.TemplateUrl || "scripts/modules/dashboard/dashboardmain.html");

                        tmpState.parent = row.Parent || "main";
                        row.State = tmpState.dashboardName;
                        states[row.id] = tmpState;
                        uiStates.addState(row.State, tmpState);
                    }

                    var tmpMenu = { "id": row.id, "title": row.Title, "state": row.State, "child": [] };

                    idToNodeMap[row.id] = tmpMenu;
                }

                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].ParentMenuID == "0") {
                        menu[rows[i].id] = idToNodeMap[rows[i].id];
                    }
                    else {
                        var parentNode = idToNodeMap[rows[i].ParentMenuID];
                        parentNode.child.push(idToNodeMap[rows[i].id]);
                    }
                }

                angular.forEach(dashboardsObjects, function (obj, i) {
                    if (!doneDashboards[i]) {
                        var astate = { "url": "/" + i, "views": { "mainContainer": { "templateUrl": "scripts/modules/dashboard/dashboardmain.html" } }, "cache": false, "dashboardName": i, "parent": "main" };
                        
                        if (obj && obj.params && obj.params.length > 0) {
                            astate.url += "?";
                            var urlParams = "";
                            for (l = 0; l < obj.params.length; l++) {
                                if (obj.params[l].length > 0) {
                                    if (urlParams.length > 0) {
                                        urlParams += "&";
                                    }
                                    urlParams += obj.params[l];
                                }
                            }
                            astate.url += urlParams;

                        }
                        uiStates.addState(i, astate);
                    }
                });
                return menu;

            });
        }
        //this.getMenu = function (menu,) { }


    }]);
})(window.angular);
