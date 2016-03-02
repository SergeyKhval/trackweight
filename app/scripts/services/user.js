'use strict';

/**
 * @ngdoc service
 * @name trackWeightApp.User
 * @description
 * # User
 * Factory in the trackWeightApp.
 */
angular.module('trackWeightApp')
  .factory('User', function (Auth, $q, Ref, $timeout) {

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@')) || '');
    }

    function ucfirst(str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

    var User;

    User = {};

    User.createAccount = function (userObj) {

      function createProfile(user) {
        var ref = Ref.child('users/' + user.uid), def = $q.defer();
        ref.set({email: userObj.email, name: firstPartOfEmail(userObj.email)}, function (err) {
          $timeout(function () {
            if (err) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });
        return def.promise;
      }

      return Auth.$createUser({email: userObj.email, password: userObj.pass})
        .then(function () {
          // authenticate so we have permission to write to Firebase
          return Auth.$authWithPassword({email: userObj.email, password: userObj.pass}, {rememberMe: true});
        })
        .then(createProfile);
    };

    User.passwordLogin = function(userObj){
      return Auth.$authWithPassword({email: userObj.email, password: userObj.pass}, {rememberMe: true});
    };

    User.getUserId = function(){
      return Ref.getAuth().uid;
    };

    return User;
  });
