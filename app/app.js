'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('app', [
  'ngRoute',
  'ngCookies',
  'loginModule',
  'logoutModule',
  'app',
  'ui.router',
  'ngLodash',
  'ngStorage',
  'ngToast',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.selection',
  'ui.grid.exporter',
  'validation',
  'validation.rule',
  'ui.bootstrap.datetimepicker',
  'ui.mask'
])
.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})  
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state("login", {
            url: "/login",
            views: {
                "mainView": { templateUrl: "partials/loginpage.html" }
            }
        })
        .state("main", {
            abstract:true,
            url: "",
            views: {
                "mainView": { templateUrl: "partials/main.html" }
            }
            
        })
        .state("main.default", {
            url: "/dashboard",
            templateUrl: "partials/mainDefault.html"
        });
}])
.run(['$rootScope', '$cookies', '$location', 'lodash', 'AUTH_EVENTS', 'AuthenticationService', '$state', 'Session', function ($rootScope, $cookies, $location, _, AUTH_EVENTS, AuthenticationService, state, Session) {

    var routesThatDontRequireAuth = ['/login'];
    var routeClean = function (route) {
        return _.find(routesThatDontRequireAuth,
          function (noAuthRoute) {
              return _.startsWith(route, noAuthRoute);
          });
    };

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        //if ($cookies.get("loggedInUser") == "null") {
        //    // no logged user, redirect to /login
        //    e.preventDefault();
        //    $location.path("/login");
        //}

        if (toParams.data) {
            var authRoles = toParams.data.authorizedRoles;
            if (!AuthenticationService.isAuthorized(authRoles)) {
                event.preventDefault();
                if (AuthenticationService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        }

        //if (!routeClean($location.url()) && !AuthenticationService.isAuthenticated()) {
        //    // redirect back to login
        //    state.go("login");
        //} else if (AuthenticationService.isAuthenticated() && $location.$$path == "/login") {
        //    state.go("main.default");
        //}
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log("stateNotFound");
        console.log(unfoundState.to);
        console.log(unfoundState.toParams);
        console.log(unfoundState.options);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log("stateChangeSuccess");
        console.log("Transition Complete to state " + toState.name);
        Session.clearUrlParams();
        $rootScope.currentState = toState.dashboardName || toState.name;
        document.body.scrollTop = document.documentElement.scrollTop = 10;

    })
}]);