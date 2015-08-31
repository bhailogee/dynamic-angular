(function (angular) {


    angular.module('app')
    .factory('DataService', ['$http', '$q', 'API', 'staticAPI', 'appConfig', '$log', 'notify', 'Session', 'SchemaService', 'ModelsService', function ($http, $q, API, staticAPI, config, log, notify, Session, SchemaService, ModelsService) {

        var apiServices = {};
        var normalize =function(apiData,apiName){

            return function (apiLoad, viewName) {
                var apiLoadData = {};
                

                if (apiLoad instanceof Array) {
                    for (var i = 0; i < apiLoad.length; i++) {
                        for (var property in apiLoad[i]) {
                            if (apiLoad[i].hasOwnProperty(property)) {
                                apiLoadData[property] = apiLoad[i][property];
                            }
                        }
                    }                    
                }
                else {
                    apiLoadData = apiLoad;
                }

                var result={};
                for (var i = 0; apiData && i < apiData.length; i++) {
                        if(apiData[i].direction=="in")
                        {                            
                            if (Session.getUrlParams(apiData[i].name)!=null) {
                                result[apiData[i].name] = Session.getUrlParams(apiData[i].name);
                            } else {
                                if (apiLoadData[apiData[i].name]!=undefined) {
                                    result[apiData[i].name] = apiLoadData[apiData[i].name];
                                }
                                else {
                                    result[apiData[i].name] = apiLoadData[i];
                                }

                            }
                        }
                }
                return result;
            }
        }
        var callingMethod = function(apiObject,apiName,isStatic){

            var _isStatic = false;
            
            var normalised = normalize(apiObject.Params, apiName);

            //'Access-Control-Allow-Origin': '*',
            //            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
            var apisExecutor = new Object();
            apisExecutor = function () {
                
                //var apiLoadData = arguments;
                //var viewName = "view1";
                //if (arguments[0] instanceof Array) {
                //    apiLoadData = arguments[0];
                //    viewName = arguments[1];
                //}

                //var postData = {
                //    "apiName": apiName,
                //    "payLoad": normalised(apiLoadData, viewName)
                //}
                var postData = apisExecutor.getRequestParams(arguments);

              
                
                
                 
                 
                
                if (ModelsService[apiName]) //if it is called from Model Holder Service than we will save its request otherwise we dont.
                {
                    ModelsService[apiName].requestParams = postData;
                }
                
                var req = {
                    method: 'POST',
                    url: config.defaultAPI + "?apiName=" + apiName,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: postData
                }

                var returnDef = $q.defer();

                var def2 = $http(req).then(function (res) {

                    var response = res.data;
                    log.debug("Request: " + JSON.stringify(req.data));
                    log.debug("Response: " + JSON.stringify(response));
                    if (response && response.status && response.status.code == "1" && response.result && response.result.v_ReturnCode != undefined && response.result.v_ReturnCode != "0") {


                        if (SchemaService.errorCodes[response.result.v_ReturnCode]) {
                            notify.warn("Error : "+ SchemaService.errorCodes[response.result.v_ReturnCode].errorDescription);
                        }
                        else {
                            notify.warn("Error : " + response.result.v_ReturnCode);
                        }                        
                    }

                    if (response && response.status && response.status.message == "Success") {
                        if (_isStatic) {
                            Session.set(postData.apiName, response.result);
                        }
                        notify.success("Done");
                        returnDef.resolve(response.result);
                        return;
                    }
                    else {
                        if (response && response.status && response.status.message) {
                            notify.error(response.status.message);
                            log.error("Request: " + JSON.stringify(req.data));
                            log.error("Response: " + JSON.stringify(response));
                            returnDef.reject(response.status.message);
                        }
                        else {
                            notify.error("Invalid Response for " + req.data.apiName);
                            log.error("Request: " + JSON.stringify(req.data));
                            log.error("Response: " + JSON.stringify(response));
                            returnDef.reject("Invalid Response for " + req.data.apiName);
                        }
                        return;
                    }
                }, function (err) {
                    notify.error(JSON.stringify(err.toString()));
                    log.error("Request:" + JSON.stringify(req.data));
                    log.error("Response:" + JSON.stringify(err));
                    returnDef.reject(err.toString());
                });

                return returnDef.promise;
            }
            apisExecutor.getRequestParams = function () {
                var _arg;
                if (arguments.length == 0) {
                    _arg = arguments;
                }
                else {
                    _arg = arguments[0];
                }
                var apiLoadData = _arg;

                var viewName = "view1";
                if (_arg[0] instanceof Array) {
                    apiLoadData = _arg[0];
                    viewName = _arg[1];
                }


                var postData = {
                    "apiName": apiName,
                    "payLoad": normalised(apiLoadData, viewName)
                };
                postData.payLoad["v_AdminID"] = Session.get("UserID");

                if (postData.payLoad.hasOwnProperty("v_TXID")) {
                    postData.payLoad["v_TXID"] = null;
                }
                if (postData.payLoad.hasOwnProperty("v_IsNestedTransaction")) {
                    postData.payLoad["v_IsNestedTransaction"] = 0;
                }
                if (postData.payLoad.hasOwnProperty("v_ClientAdminID") && postData.payLoad["v_ClientAdminID"]) {
                    postData.payLoad["v_ClientAdminID"] = 1;
                }

                if (postData.payLoad.hasOwnProperty("v_AgentID") && postData.payLoad["v_AgentID"] == null) {
                    postData.payLoad["v_AgentID"] = Session.get("v_AgentID");
                }
                if (postData.payLoad.hasOwnProperty("v_LocationID") && postData.payLoad["v_LocationID"] == null) {
                    postData.payLoad["v_LocationID"] = Session.get("v_LocationID");
                }




                return postData;
            }
            return apisExecutor;
        }

        //angular.forEach(API, function (value, key) {

        //    if (API.hasOwnProperty(key)) {
        //        this[key] = new callingMethod(value);
        //    }
        //}, apiServices);

        //angular.forEach(staticAPI, function (value, key) {

        //    if (staticAPI.hasOwnProperty(key)) {
        //        this[key] = new callingMethod(value,true);
        //    }
        //}, apiServices);
        SchemaService.promise.then(function () {
            angular.forEach(SchemaService.getMethods(), function (value, key) {
                this[key] = new callingMethod(value,key);
            }, apiServices);
        });

        apiServices._editChanges = function (scope) {

            var apiName = scope.apiName || scope.viewObject.apiName;

            var apiParams = [];

            if (scope.data && scope.data.Params) {
                angular.forEach(scope.data.Params, function (value, key) {

                    var change = {};
                    if (value.value=='') {
                        value.value = null;
                    }
                    change[value.name] = value.value;
                    apiParams.push(change);
                });
            }

            return apiServices[apiName](apiParams,scope.viewObject.viewName);
        }

        return apiServices;               
        

    }]);

})(window.angular);