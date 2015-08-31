(function (angular) {


    angular.module('app').service('AuthenticationService', ['Session', '$q', 'DataService', 'UserConfigurationService', function (Session, $q, ds, UserConfigService) {

        this.isAuthenticated = function () {
            var isLogged = Session.get("UserID");
            return !!isLogged;
        },
        this.currentUserID = function () {
            return Session.get("UserID");
        }
        

        this.logIn = function (loginModel) {

            var def = $q.defer();

            
            //ds.TX_MatchAccNoUserNamePassword(loginModel.loginName, loginModel.password)
            //.then(function (response) {
            //    if (response.v_ReturnCode == "0") {
            //        Session.set("UserID", response.v_AccountID);                    
            //        def.resolve(true);
            //        return;
            //    }
            //    def.resolve(false);
            //    return;
            //});

            ds.TX_AuthenticateAdminUser(loginModel.loginName, loginModel.password)
            .then(function (response) {
                if (response.v_ReturnCode == "0") {
                    Session.set("UserID", response.v_AdministratorID);
                    Session.set("v_AgentID", response.v_AgentID);
                    Session.set("v_LocationID", response.v_LocationID);
                    UserConfigService.getUserConfigurations();
                    def.resolve(true);
                    return;
                }
                def.resolve(false);
                return;
            });

            return def.promise;
        }

        this.logOut = function () {
            Session.clear();
        }

        this.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (AuthenticationService.isAuthenticated() &&
              authorizedRoles.indexOf(Session.userRole) !== -1);
        }

    }]);

})(window.angular);