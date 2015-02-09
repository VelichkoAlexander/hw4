app.controller('MainController', ['$scope','$firebase', function($scope,$firebase) {
        var ref = new Firebase("https://contactshw4.firebaseio.com");

        //create an AngularFire reference to the data
        var sync = $firebase(ref);
$scope.show=true;
        // download the data into a local object
        $scope.datas = sync.$asArray();
        $scope.showGrid= false;

        $scope.addPerson=function(data){// функциця добавления в базу контакта
        $scope.datas.$add(data);
            $scope.show=false;

        };
        $scope.contactEdit=function(id){
            location.href='#/update-contact/'+id+'';

    };
        $scope.addContact=function(){
            location.href='#/addContact';
        }

}]);

