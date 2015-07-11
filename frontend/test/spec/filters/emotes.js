'use strict';

describe('Filter: emotes', function () {

  // load the filter's module
  beforeEach(module('websiteApp'));

  // initialize a new instance of the filter before each test
  var emotes;
  beforeEach(inject(function ($filter) {
    emotes = $filter('emotes');
  }));

  it('should return the input prefixed with "emotes filter:"', function () {
    var text = 'angularjs';
    expect(emotes(text)).toBe('emotes filter: ' + text);
  });

});
