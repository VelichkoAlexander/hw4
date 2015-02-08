app.controller('MainController', ['$scope','$firebase', function($scope,$firebase) {
        var ref = new Firebase("https://contactshw4.firebaseio.com");

        // create an AngularFire reference to the data
        var sync = $firebase(ref);

        // download the data into a local object
        $scope.datas = sync.$asObject();
        $scope.showGrid= false;
 console.log($scope);
}]);

