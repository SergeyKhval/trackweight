'use strict';

/**
 * @ngdoc service
 * @name trackWeightApp.weight
 * @description
 * # weight
 * Factory in the trackWeightApp.
 */
angular.module('trackWeightApp')
  .factory('weight', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
