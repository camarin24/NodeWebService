(function($,angular){
  var app = angular.module('warframe');
  app.controller("mainController",function($scope){
    $scope.message = "hello";
    $scope.backgroundClass = "login-background";
  })
  app.controller("registroController",function($scope){
    $scope.message = "hello registro";
  })
})(jQuery,angular)
