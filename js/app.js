
var app = angular.module('loginApp', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);
var orgUrl = 'https://dev-977144-admin.oktapreview.com';    


app.config(function($routeProvider) {
        $routeProvider

        .when('/', {
            templateUrl : 'views/login.html',
            controller  : 'loginController'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'loginController'
        })
        .when('/register', {
            templateUrl : 'views/register.html',
            controller  : 'registerController'
        })
        .when('/help', {
            templateUrl : 'views/help.html',
            controller  : 'helpController'
        })
        .otherwise({
            redirectTo: '/'
        });
});   
app.controller('helpController',['$scope','$http',function($scope,$http) {
}]);   

app.controller('loginController',['$scope','$http',function($scope,$http) {
    var redirectUrl = 'https://google.com';
      
    var oktaSignIn = new OktaSignIn({
      baseUrl: orgUrl,
      logo: 'images/cbsIST_logo_blue.svg',

      features: {
        rememberMe: false,
        smsRecovery: false,
        selfServiceUnlock: false,
      },
      helpLinks: {
          help: 'https://cbs.service-now.com/stagehand/kb'
      },
      // See the contents of the 'okta-theme.css' file for a full list of labels.
      labels: {
        'primaryauth.title': 'CBS & You Portal',
        'primaryauth.username': 'Partner ID',
        'primaryauth.username.tooltip': 'Can add some tooltip text here for password help',
        'primaryauth.password': 'Password',
        'primaryauth.password.tooltip': 'Password help goes here'
      }
    });
  
    oktaSignIn.renderEl(
      { el: '#okta-login-container' },
      function (res) {
          console.log(res);
        if (res.status === 'SUCCESS') {
          console.log('User %s successfully authenticated %o', res.user.profile.login, res.user);
          //res.session.setCookieAndRedirect(redirectUrl); 
        }
      }
    );
    
}]);

app.controller('mainController',['$scope','$http','$location',function($scope,$http,$location) {
    var apiKey = '00nqDnbj7GjStIIk0GetnUK5RCw0ONJVgZULSBQmAt';
    $scope.msg = false;
    //request
    $scope.findUser = function(uname) {
        var urlBase = orgUrl+'/api/v1/users/'+uname;
        var data = $http({
            url: urlBase,
            method: "GET",
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'SSWS '+ apiKey
            }
        });
        return data.then(function(response){
                var user = response.data;
                if(user.activated != null) {
                    $scope.msg = 'Looks like you\'re already active. Use the sign-in form to login.';
                    $scope.passtest = false;
                } else {
                    $scope.msg = 'Enter your information into the form to complete registration.'
                    $location.path('/register');
                    $scope.passtest = false;
                    $scope.registerActive = true;
                } 
        })
        .catch(function() {
            console.log('wiii');
            return $scope.msg = 'Sorry, I don\'t recognize that username. You\'ll likely need to call Mercer';
        });
    };
}]);

app.controller('registerController',['$scope','$http',function($scope,$http) {
    //form input mask
    $("#dob").mask("99/99",{placeholder:"MMDD"});
    //config
    var url = 'https://dev-977144-admin.oktapreview.com';
    var apiKey = '00nqDnbj7GjStIIk0GetnUK5RCw0ONJVgZULSBQmAt';
    var fname = $scope.fname;
    var lname = $scope.lname;
    
    //request
    $scope.findUser = function() {
        var urlBase = url+'/api/v1/users/me';

        var data = $http({
            url: urlBase,
            method: "GET",
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'SSWS '+ apiKey
            }
        });
        return data.then(function(response){
            console.log(response)
        });
    };
    
    
    
}]);











        
 