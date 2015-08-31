(function (angular) {

    angular.module('app')
    .constant('appConfig', {
        'defaultAPI': "\server",
        'schema': "schema/schema.json",
        'viewsSwitch': "schema/views.json",
        'packageName': 'guidb',
        'dashboards': 'schema/dashboards.json',
        'staticNames': ["ID", "SG", "ABMF", "NW", "IP", "XSD", "XML", "URI", "FQDN", "AAA", "SBC", "AS", "IVR", "URI", "PIN"],
        'errorcodes': 'schema/errorcodes.json',
        'toastSwitch': { 'warning': true, 'danger': true, 'info': true, 'success': false },
        'toastTime': { 'warning': 2000, 'danger': 2000, 'info': 2000, 'success': 20000 }
    });

})(window.angular);