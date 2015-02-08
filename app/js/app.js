var app = angular.module('ContactApp', ["firebase","ngRoute"]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/contact-list.html',
                controller: 'MainController'
            }).
             otherwise({
                redirectTo: '/'
            });

    }]);
