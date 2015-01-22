'use strict';

angular.module('services.auth',['ipCookie'])
    .factory('Auth', function Auth($location, $rootScope, $http, ipCookie, Token, User, ENV, API) {
        $rootScope.currentToken = {
            token_type:ipCookie("node_todo.token_type"),
            access_token: ipCookie("node_todo.token")
        };

        return {

            login: function(user, callback) {
                var cb = callback || angular.noop;

                Token.save({
                    grant_type: "password",
                    username: user.email,
                    password: user.password
                }, function(token) {
                    $rootScope.currentToken = token;
                    ipCookie("node_todo.token_type", token.token_type, {expires:30});
                    ipCookie("node_todo.token", token.access_token, {expires:30});
                    $http({
                        method: "GET",
                        url: API.url + "/user",
                        headers: {
                            "Authorization": token.token_type + " " + token.access_token
                        }
                    }).then(function(response){
                        // console.log("success", response.data);
                        $rootScope.currentUser = response.data;
                        return cb();
                    }, function(response){
                        return cb(response.data);
                    });

                }, function(err) {
                    return cb(err.data);
                });
            },

            logout: function(callback) {
                var cb = callback || angular.noop;
                $rootScope.currentToken = null;
                $rootScope.currentUser = null;
                ipCookie.remove("node_todo.token");
                ipCookie.remove("node_todo.token_type");
                return cb();
            },

            currentUser: function() {
                $http({
                    method: "GET",
                    url: API.url + "/user",
                    headers: {
                        "Authorization": ipCookie("node_todo.token_type") + " " + ipCookie("node_todo.token")
                    }
                }).then(function(response){
                    // console.log("success", response.data);
                    $rootScope.currentUser = response.data;
                    return;
                }, function(response){
                    return response.data;
                });
            },

            createUser: function(name, email, password, callback) {
                var data = {
                    email: email,
                    name:name,
                    password:password
                };
                $http({
                    method: "POST",
                    url: API.url + "/user",
                    data:data 
                }).then(function(response){
                    console.log("success", response.data);
                    callback(null, response.data);
                }, function(response){
                    return callback(response.data);
                });
            }
        };
    })