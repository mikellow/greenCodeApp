var app = angular.module('app',[]).
config(function(){
    console.log('hi bitch')
}).
run(function(){

});






app.controller('mainCtrl',['$scope', function($scope){
    $scope.hello="hello on expres-anuglar-boiler by green-code.net";
}]);

app.directive('navigation',function(){
    return {
        templateUrl : '/views/partials/navigation.html'
    }
})