'use strict';

angular.module('services.token',[])
    .factory('Token', function ($resource, API) {
        return $resource(API.url + '/token');
    });