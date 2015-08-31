(function (angular) {
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('app')
    .directive('searchpanelDirective',['SchemaService', function (sc) {


        return {
            templateUrl: currentScriptPath.replace('searchpanel.js', 'searchpanel.html'),
            controller: function ($scope, $location) {
                

                $scope.dropdownList = [];
                $scope.nData = {};
                var schemaObj = sc.getMethod($scope.viewObject.apiName);

                if(schemaObj.Params.length>0)
                {
                    angular.forEach(schemaObj.Params,function(i,v){
                        var count=0;
                        if(i.direction=="in"){
                            var a={};
                            a.value=i.name;
                            a.ID=count++;
                            $scope.dropdownList.push(a);
                        }

                    })
                }



                var res={};
                angular.forEach($scope.dropdownList,function(i,v){
                    res[i]=null;
                });

                res["v_ID3"]="sadf";
                
                onbbutsdfas = function () {
                    ds[$scope.viewObject.apiName](res).then(function (n) {

                        $scope.nData = n.rows;
                        $scope.searchdone=true;

                        //scope.apply or digest
                    }                    );


            },
            scope: {
                viewObject: "=",    // Priority 1
                viewName: "@",      // Priority 2
                //updateProcName: "@", // Priority 3
                //showasmodal: "@",
                dashboard: "="
            }
        }

    }]);
})(window.angular);
