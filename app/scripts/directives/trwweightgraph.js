/*globals d3: false*/
'use strict';

/**
 * @ngdoc directive
 * @name trackWeightApp.directive:trwWeightGraph
 * @description
 * # trwWeightGraph
 */
angular.module('trackWeightApp')
  .directive('trwWeightGraph', function () {
    var directiveObj = {
      restrict: 'E',
      replace: false,
      scope: {data: '=graphData'},
      link: function (scope, element) {
        var chart = d3.select(element[0]);

        scope.$watch('data', function () {
          console.log(scope.data);
          if (scope.data) {
            chart.append('div').attr('class', 'chart')
              .selectAll('div')
              .data(scope.data).enter().append('div')
              .style('width', function (d) {
                return d.weight + '%';
              });
          }

        });


      }
    };

    return directiveObj;
  });
