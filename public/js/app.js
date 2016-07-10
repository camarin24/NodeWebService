(function () {
  $.material.init();
  var app = angular.module('warframe', []);
  app.controller("eventosController", function ($scope, $http) {
    /*Modelos*/
    $scope.mdlEvento = {
      nombre: "",
      descripcion: ""
    }

    /*Funciones http*/
    $http.get('/app/getEvents/123', { id: "123" }).then(function (res) {
    console.log(res.data);
      $scope.eventos = res.data;
    }, function (res) {
      $scope.showError(res);
    });

    /*helpers*/
    $scope.openModal = function () {
      $("#mdl_evento").modal('show');
      return false;
    }
    $scope.enviarForm = function () {
      $("#formEvento").submit();
    }
    $scope.formReset = function () {
      $("#formEvento")[0].reset();
    }
    $scope.showError= function(err){
      console.log(err)
      alertify.set('notifier','position', 'top-right');
      alertify.notify('Ocurrio un error desconocido.','error',15)
    }
  })
})()
