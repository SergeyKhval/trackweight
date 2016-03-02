/*globals Firebase: false*/

'use strict';

/**
 * @ngdoc service
 * @name trackWeightApp.weight
 * @description
 * # weight
 * Factory in the trackWeightApp.
 */
angular.module('trackWeightApp')
  .factory('Weight', function ($firebaseArray, Ref) {
    var Weight;

    Weight = {};

    Weight.storeWeight = function (userId, weight) {
      var weightArray = $firebaseArray(Ref.child('users/' + userId + '/weights'));

      weightArray.$add({
        weight: weight,
        time: Firebase.ServerValue.TIMESTAMP
      });
    };

    Weight.getWeights = function (userId) {
      return $firebaseArray(Ref.child('users/' + userId + '/weights'));
    };

    return Weight;
  });
