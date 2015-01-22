'use strict';

angular.module('services.user',[])
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
