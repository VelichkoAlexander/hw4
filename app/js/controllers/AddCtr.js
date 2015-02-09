app.controller('AddCtr', ['$scope','$firebase','$routeParams', function($scope, $firebase, $routeParams) {
    var ref = new Firebase("https://contactshw4.firebaseio.com/"+$routeParams.id+"");

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    $scope.person = sync.$asObject();
   $scope.updatePerson=function(data){
       $scope.person.$save(data);

   }
    $scope.delPerson=function(){
        $scope.person.$remove($routeParams.id);
        location.href='#/';
    }


}]);
