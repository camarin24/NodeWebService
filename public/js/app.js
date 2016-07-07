(function(){
  $.material.init();
  var app = angular.module('warframe',[]);
  app.controller("eventosController",function($scope,$http){
    $http.get('/app/getEvents/123', {id : "123"}).then(function(res){
      $scope.eventos = JSON.stringify(res);
      console.log($scope.eventos);
    }, function(res){

    });
  })
})()
