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
      restrict: 'EA',
      replace: false,
      scope: {data: '=graphData'},
      link: function (scope, element) {
        var vis = d3.select(element[0]);

        scope.$watch('data', function () {
          if (scope.data) {
            var WIDTH = 1000,
              HEIGHT = 500,
              MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
              },
              xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(scope.data, function (d) {
                return d.time;
              }), d3.max(scope.data, function (d) {
                return d.time;
              })]),
              yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(scope.data, function (d) {
                return d.weight;
              }), d3.max(scope.data, function (d) {
                return d.weight;
              })]),
              xAxis = d3.svg.axis()
                .scale(xRange)
                .tickSize(5)
                .tickSubdivide(true),
              yAxis = d3.svg.axis()
                .scale(yRange)
                .tickSize(5)
                .orient('left')
                .tickSubdivide(true);

            vis.append('svg:g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
              .call(xAxis);

            vis.append('svg:g')
              .attr('class', 'y axis')
              .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
              .call(yAxis);

            var lineFunc = d3.svg.line()
              .x(function (d) {
                return xRange(d.time);
              })
              .y(function (d) {
                return yRange(d.weight);
              })
              .interpolate('basis');

            vis.append('svg:path')
              .attr('d', lineFunc(scope.data))
              .attr('stroke', '#337ab7')
              .attr('stroke-width', 2)
              .attr('fill', 'none');
          }
        });


      }
    };

    return directiveObj;
  });
