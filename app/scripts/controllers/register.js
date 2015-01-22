'use strict';

angular.module('node-todo-angular.register',[])
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.register = function(form) {
      Auth.createUser(
          $scope.user.name,
          $scope.user.email,
          $scope.user.password
        ,
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };
  });