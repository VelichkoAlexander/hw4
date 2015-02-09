var app = angular.module('ContactApp',  ["firebase","ngRoute"]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/contact-list.html',
                controller: 'MainController'
            }).
            when('/addContact', {
                templateUrl: 'views/add-contact.html',
                controller: 'MainController'
            }).
            when('/update-contact/:id', {
                templateUrl: 'views/update-contact.html',
                controller: 'AddCtr'
            }).
             otherwise({
                redirectTo: '/'
            });

    }]);
