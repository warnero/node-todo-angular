angular.module( 'node-todo-angular', [
    'ipCookie',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'base64',
    'http-auth-interceptor',
    'ui.bootstrap',
    'services.auth',
    'services.session',
    'services.token',
    'services.user',
    'node-todo-angular.navbar',
    'node-todo-angular.main',
    'node-todo-angular.register',
    'node-todo-angular.login',
    'config'
])
.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/partials/main.html',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: 'views/partials/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/partials/signup.html',
            controller: 'SignupCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.run(function ($rootScope, $location,$base64, $http,ipCookie, Auth) {

    $http.defaults.headers.common['Accept'] = 'application/json;';
    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      } else {
        $http.defaults.headers.common['Authorization'] = ipCookie("rp_land.token_type") + " " + ipCookie("rp_land.token");
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });