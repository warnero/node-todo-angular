'use strict';

angular.module('node-todo-angular.login',[])
  .controller('LoginCtrl', function ($scope, $http, $base64, Auth, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {

      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode("test:secret");
      Auth.login({
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/clients');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };
  });