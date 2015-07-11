'use strict';

describe('Directive: animationOnChange', function () {

  // load the directive's module
  beforeEach(module('websiteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<animation-on-change></animation-on-change>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the animationOnChange directive');
  }));
});
