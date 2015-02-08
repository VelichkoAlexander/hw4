app.directive('contactsList', function(){
    return{
	restrict: 'E',
	scope: {
        contact:'='
    },
	 templateUrl: 'js/directives/contactsList.html'
    };
});