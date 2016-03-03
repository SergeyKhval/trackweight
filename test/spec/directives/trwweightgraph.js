'use strict';

describe('Directive: trwWeightGraph', function () {

  // load the directive's module
  beforeEach(module('trackWeightApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<trw-weight-graph></trw-weight-graph>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the trwWeightGraph directive');
  }));
});
