'use strict';

angular.module('node-todo-angular.navbar',["services.auth"])
    .controller('NavbarCtrl', function ($scope, Auth, $location) { 
        $scope.logout = function() {
            Auth.logout(function(err) {
                if(!err) {
                    $location.path('/login');
                }
            });
        };
    });