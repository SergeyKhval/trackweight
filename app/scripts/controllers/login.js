'use strict';
/**
 * @ngdoc function
 * @name trackWeightApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('trackWeightApp')
  .controller('LoginCtrl', function ($scope, $location, User) {
    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }

    $scope.passwordLogin = function (user) {
      $scope.err = null;

      User.passwordLogin(user).then(
        redirect, showError
      );
    };

    $scope.createAccount = function (user) {
      $scope.err = null;
      if (!user.pass) {
        $scope.err = 'Please enter a password';
      }
      else if (user.pass !== user.confirm) {
        $scope.err = 'Passwords do not match';
      } else {
        User.createAccount(user).then(redirect, showError);
      }
    };
  });
