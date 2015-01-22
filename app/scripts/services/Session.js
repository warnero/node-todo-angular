'use strict';

angular.module('services.session',[])
    .factory('Session', function ($resource, API) {
        return $resource(API.url + '/token');
    });