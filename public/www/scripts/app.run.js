angular.module('2017Web').run(['$rootScope', function ($rootScope) {
    var storeId = '24';
    //var domain = 'https://ilab.csie.io';
    var domain = 'http://192.168.50.86:3024';
    $rootScope.url = domain + '/apps' + storeId + '/istore';
    $rootScope.istoreUrl = 'https://ilab.csie.io/apps09/istore';
}]);
