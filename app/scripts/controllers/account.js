'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('trackWeightApp')
  .controller('AccountCtrl', function ($scope, user, Weight, Auth, Ref, $firebaseObject, $timeout) {
    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg + '', type: type};
      $scope.messages.unshift(obj);
      $timeout(function () {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

    var profile = $firebaseObject(Ref.child('users/' + user.uid));

    $scope.user = user;
    $scope.weights = null;
    $scope.logout = function () {
      Auth.$unauth();
    };
    $scope.messages = [];

    profile.$bindTo($scope, 'profile');

    Weight.getWeights(user.uid).$loaded().then(function(data){
      $scope.weights = data;
    });


    $scope.changePassword = function (oldPass, newPass, confirm) {
      $scope.err = null;
      if (!oldPass || !newPass) {
        error('Please enter all fields');
      }
      else if (newPass !== confirm) {
        error('Passwords do not match');
      }
      else {
        Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
          .then(function () {
            success('Password changed');
          }, error);
      }
    };

    $scope.changeEmail = function (pass, newEmail) {
      $scope.err = null;
      Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
        .then(function () {
          profile.email = newEmail;
          profile.$save();
          success('Email changed');
        })
        .catch(error);
    };

    $scope.saveWeight = function (weight) {
      return Weight.storeWeight(user.uid, parseInt(weight));
    };
  });
